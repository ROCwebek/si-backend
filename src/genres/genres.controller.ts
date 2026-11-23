import { Controller, Get, Param } from '@nestjs/common';
import { GenreEntity } from './entities/genre.entity.js';
import { GenresService } from './genres.service.js';

// Genres are a fixed reference list managed through the seed
// (src/database/seeds/data/genres.data.ts), so the API is read-only.
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  getAllGenres(): Promise<GenreEntity[]> {
    return this.genresService.getAllGenres();
  }

  @Get(':id')
  getGenreById(@Param('id') id: string): Promise<GenreEntity> {
    return this.genresService.getGenreById(id);
  }
}
