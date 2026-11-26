# SeenIt Backend

REST API for SeenIt: movies, genres, users, watchlists and reviews.
Built with NestJS, TypeORM, PostgreSQL and JWT auth. All routes are prefixed with `/api`.

## Quick start

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
| `SELECT title, release_year FROM movies;` | Show the seeded movies                        |
| `\q`                                      | Quit                                          |

Tables, indexes and constraints are defined in [src/database/migrations/](src/database/migrations/).

## Database and seeding

The `seed` service ([src/database/seeds/](src/database/seeds/)) runs on every start. It applies pending migrations and adds missing roles and genres. Movies are only added when the `movies` table is empty. Existing data is kept.

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

