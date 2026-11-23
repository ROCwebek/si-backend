import { v4 as uuidv4 } from 'uuid';
import dataSource from '../data-source.js';
import { MovieEntity } from '../../movies/entities/movie.entity.js';
import { movies } from './data/movies.data.js';
import { GenreEntity } from '../../genres/entities/genre.entity.js';
import { genreNames } from './data/genres.data.js';
import { RoleEntity } from '../../users/entities/role.entity.js';

await dataSource.initialize();
try {
  await dataSource.runMigrations();

  const messages = await dataSource.transaction(async (manager) => {
    const messages: string[] = [];
    const movieRepo = manager.getRepository(MovieEntity);
    const genreRepo = manager.getRepository(GenreEntity);
    const roleRepo = manager.getRepository(RoleEntity);

    // 1. Roles: insert any that are missing (matched on the unique role name)
    const roleNames = ['admin', 'user'];
    const existingRoles = await roleRepo.find();
    const knownRoles = new Set(existingRoles.map((role) => role.role));
    const missingRoles = roleNames
      .filter((name) => !knownRoles.has(name))
      .map((name) => roleRepo.create({ role_pk: uuidv4(), role: name }));

    if (missingRoles.length > 0) {
      await roleRepo.save(missingRoles);
      messages.push(`Seedede ${missingRoles.length} roller`);
    } else {
      messages.push('Alle roller findes allerede. Springer over.');
    }

    // 2. Genres: insert any that are missing (matched on the unique name)
    const existingGenres = await genreRepo.find();
    const knownNames = new Set(existingGenres.map((genre) => genre.name));
    const missingGenres = genreNames
      .filter((name) => !knownNames.has(name))
      .map((name) => genreRepo.create({ genre_pk: uuidv4(), name }));

    if (missingGenres.length > 0) {
      await genreRepo.save(missingGenres);
      messages.push(`Seedede ${missingGenres.length} genrer`);
    } else {
      messages.push('Alle genrer findes allerede. Springer over.');
    }

    const genresByName = new Map(
      (await genreRepo.find()).map((genre) => [genre.name, genre]),
    );

    const toGenres = (names: string[]): GenreEntity[] =>
      names.map((name) => {
        const genre = genresByName.get(name);
        if (!genre) {
          throw new Error(`Ukendt genre i seed-data: ${name}`);
        }
        return genre;
      });

    // 3. Movies: only seeded into an empty table
    if ((await movieRepo.count()) === 0) {
      await movieRepo.save(
        movies.map(({ genre_names, ...movie }) =>
          movieRepo.create({ ...movie, genres: toGenres(genre_names) }),
        ),
      );
      messages.push(`Seedede ${movies.length} film`);
    } else {
      messages.push('Der er allerede film i databasen. Springer over.');
    }

    // 4. Link seed movies that have no genres yet (also covers databases seeded
    //    before genres existed). Movie ids are regenerated on every load, so the
    //    match is made on title.
    for (const { title, genre_names } of movies) {
      const movie = await movieRepo.findOne({
        where: { title },
        relations: { genres: true },
      });

      if (movie && movie.genres.length === 0) {
        movie.genres = toGenres(genre_names);
        await movieRepo.save(movie);
        messages.push(`Tilknyttede genrer til ${title}`);
      }
    }

    return messages;
  });

  for (const message of messages) {
    console.log(message);
  }
} finally {
  await dataSource.destroy();
}
