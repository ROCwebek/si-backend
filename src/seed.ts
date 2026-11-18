import dataSource from './data-source.js';
import { MovieEntity } from './movies/entities/movie.entity.js';
import { movies } from './movies/data/movies.data.js';

await dataSource.initialize();
const repo = dataSource.getRepository(MovieEntity);

if ((await repo.count()) === 0) {
  await repo.save(movies);
  console.log(`Seedede ${movies.length} film`);
} else {
  console.log('Der er allerede film i databasen. Springer over.');
}

await dataSource.destroy();
