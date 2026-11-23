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

  await dataSource.transaction(async (manager) => {
    const roleRepo = manager.getRepository(RoleEntity);
    const genreRepo = manager.getRepository(GenreEntity);
    const movieRepo = manager.getRepository(MovieEntity);

    // 1. Opret manglende roller
    for (const role of ['admin', 'user']) {
      const exists = await roleRepo.findOneBy({ role });

      if (!exists) {
        await roleRepo.save({
          role_pk: uuidv4(),
          role,
        });
      }
    }

    // 2. Opret manglende genrer
    for (const name of genreNames) {
      const exists = await genreRepo.findOneBy({ name });

      if (!exists) {
        await genreRepo.save({
          genre_pk: uuidv4(),
          name,
        });
      }
    }

    // 3. Hent genrerne
    const genres = await genreRepo.find();

    // 4. Indsæt film, hvis tabellen er tom
    if ((await movieRepo.count()) === 0) {
      for (const { genre_names, ...movie } of movies) {
        const movieGenres = genre_names.map((name) => {
          const genre = genres.find((g) => g.name === name);

          if (!genre) {
            throw new Error(`Ukendt genre: ${name}`);
          }

          return genre;
        });

        await movieRepo.save({
          ...movie,
          genres: movieGenres,
        });
      }
    }
  });

  console.log('Seeding gennemført!');
} finally {
  await dataSource.destroy();
}
