# SeenIt Backend

## Overview

REST API for SeenIt: movies, genres, users, watchlists and reviews.
Built with NestJS, TypeORM, PostgreSQL and JWT auth. All routes are prefixed with `/api`.

## Setup

Requires Docker with Compose, and Node.js for `npm install`.

After cloning the repository, install the dependencies:

```bash
npm install
```

This is for working with the code locally (editor, lint and tests). Docker installs its own dependencies.

Then start the project:

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

### pgAdmin

To use pgAdmin instead of `psql`, start the project, then right-click **Servers** → **Register** → **Server...**

| Tab        | Field                | Value        |
| ---------- | -------------------- | ------------ |
| General    | Name                 | `SeenIt`     |
| Connection | Host name/address    | `localhost`  |
| Connection | Port                 | `5433`       |
| Connection | Maintenance database | `seenit`     |
| Connection | Username             | `seenit`     |
| Connection | Password             | `seenit_dev` |

- Tables: **Databases → seenit → Schemas → public → Tables**
- Diagram: right-click the `seenit` database → **ERD For Database**
- SQL: right-click the `seenit` database → **Query Tool**

## Dataset

| Table             | Content                                              |
| ----------------- | ---------------------------------------------------- |
| `movies`, `genres` | Movies and genres                                   |
| `movie_genres`    | Many-to-many between movies and genres               |
| `users`, `roles`  | Each user has one role                               |
| `reviews`         | One per user and movie, rating 1–5                   |
| `watchlist`       | Movies saved by users, one row per user and movie    |

The `seed` service ([src/database/seeds/](src/database/seeds/)) runs on every start. It applies pending migrations and adds missing roles (`admin` and `user`) and genres. Movies are only added when the `movies` table is empty. Existing data is kept. Test users are added, with their watchlists and reviews, if their email is not already in the database.

The seed data is defined in [src/database/seeds/data/](src/database/seeds/data/).

### Reset the database

This deletes **all** data in the local database. It is required if you want changes to the movie seed data applied.

It also fixes `relation ... already exists` from `seed` when your local database was created with an earlier version of a migration.

```bash
docker compose down -v
docker compose up --build
```

### Test users

All seeded users have the password `password`. See [users.data.ts](src/database/seeds/data/users.data.ts) for the full list.

| Role  | Email               |
| ----- | ------------------- |
| admin | `admin@example.com` |
| user  | `anna@example.com`  |

Log in with `POST /api/auth/login` and a JSON body containing `email` and `password`. Send the returned `access_token` as `Authorization: Bearer <token>`. It expires after 15 minutes.

These accounts are for local testing only. Do not run the seed against a publicly accessible database.

## Example queries

Run these in `psql` or the pgAdmin Query Tool (see [View the database](#view-the-database)).

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

