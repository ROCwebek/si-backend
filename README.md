# SeenIt Backend

## Overview

REST API for SeenIt: movies, genres, users, watchlists and reviews.
Built with NestJS, TypeORM, PostgreSQL and JWT auth. All routes are prefixed with `/api`.

## Setup

Requires Docker with Compose.

```bash
docker compose up --build
```

This starts the database, seeds it and starts the backend. No `.env` file is needed.

| Service  | Address                          |
| -------- | -------------------------------- |
| API      | http://localhost:3000/api/movies |
| Database | `localhost:5433`, with user `seenit`, password `seenit_dev`, database `seenit` |

## View the database

While the project is running, open `psql` in a second terminal:

```bash
docker compose exec postgres psql -U seenit -d seenit
```

| Command                                   | Description                                   |
| ----------------------------------------- | --------------------------------------------- |
| `\dt`                                     | List all tables                               |
| `\d reviews`                              | Show a table's columns, indexes and constraints |
| `\di`                                     | List all indexes                              |
| `SELECT title, release_year FROM movies;` | Show the seeded movies                        |
| `\q`                                      | Quit                                          |

Tables, indexes and constraints are defined in [src/database/migrations/](src/database/migrations/).

## Dataset

| Table             | Content                                              |
| ----------------- | ---------------------------------------------------- |
| `movies`, `genres` | Movies and genres                                   |
| `movie_genres`    | Many-to-many between movies and genres               |
| `users`, `roles`  | Each user has one role                               |
| `reviews`         | One per user and movie, rating 1–5                   |
| `watchlist`       | Movies saved by users, one row per user and movie    |

The `seed` service ([src/database/seeds/](src/database/seeds/)) runs on every start. It applies pending migrations and adds missing roles (`admin` and `user`) and genres. Movies are only added when the `movies` table is empty. Existing data is kept. No users, reviews or watchlist entries are seeded.

The seeded genres and movies are defined in [src/database/seeds/data/](src/database/seeds/data/).

### Reset the database

This deletes **all** data in the local database. It is required if you want changes to the movie seed data applied.

It also fixes `relation ... already exists` from `seed` when your local database was created with an earlier version of a migration.

```bash
docker compose down -v
docker compose up --build
```

### Create an admin

The seed does not create any users. Sign up through `POST /api/users` with a JSON body containing `user_name`, `user_email` and `user_password` (min. 8 characters), then promote the user:

```bash
docker compose exec postgres psql -U seenit -d seenit -c \
  "UPDATE users SET role_fk = (SELECT role_pk FROM roles WHERE role = 'admin') WHERE user_email = 'you@example.com';"
```

## Example queries

Run these in `psql` (see [View the database](#view-the-database)).

### Movies and their genres

Joins the many-to-many relation through `movie_genres`.

```sql
SELECT m.title, string_agg(g.name, ', ' ORDER BY g.name) AS genres
FROM movies m
JOIN movie_genres mg ON mg.movie_fk = m.movie_pk
JOIN genres g ON g.genre_pk = mg.genre_fk
GROUP BY m.movie_pk
ORDER BY m.title;
```

### Full-text search on titles

The same kind of prefix search as `GET /api/movies?search=dar` ([movies.service.ts](src/movies/movies.service.ts)). Prefix the query with `EXPLAIN` to see `Bitmap Index Scan on idx_movies_title_fts`.

```sql
SELECT title FROM movies
WHERE to_tsvector('simple', title) @@ to_tsquery('simple', 'dar:*');
```

