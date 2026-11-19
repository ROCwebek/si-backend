import { v4 as uuidv4 } from 'uuid';
import dataSource from './data-source.js';
import { MovieEntity } from './movies/entities/movie.entity.js';
import { movies } from './movies/data/movies.data.js';
import { GenreEntity } from './genres/entities/genre.entity.js';
import { genreNames } from './genres/data/genres.data.js';

await dataSource.initialize();
const movieRepo = dataSource.getRepository(MovieEntity);
const genreRepo = dataSource.getRepository(GenreEntity);

// 1. Genres: insert any that are missing (matched on the unique name)
const existingGenres = await genreRepo.find();
const knownNames = new Set(existingGenres.map((genre) => genre.name));
const missingGenres = genreNames
  .filter((name) => !knownNames.has(name))
  .map((name) => genreRepo.create({ genre_pk: uuidv4(), name }));

if (missingGenres.length > 0) {
  await genreRepo.save(missingGenres);
  console.log(`Seedede ${missingGenres.length} genrer`);
} else {
  console.log('Alle genrer findes allerede. Springer over.');
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

// 2. Movies: only seeded into an empty table
if ((await movieRepo.count()) === 0) {
  await movieRepo.save(
    movies.map(({ genre_names, ...movie }) =>
      movieRepo.create({ ...movie, genres: toGenres(genre_names) }),
    ),
  );
  console.log(`Seedede ${movies.length} film`);
} else {
  console.log('Der er allerede film i databasen. Springer over.');
}

// 3. Link seed movies that have no genres yet (also covers databases seeded
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
    console.log(`Tilknyttede genrer til ${title}`);
  }
}

await dataSource.destroy();
