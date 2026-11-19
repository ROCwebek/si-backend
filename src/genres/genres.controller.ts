import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';
import { GenreEntity } from './entities/genre.entity.js';
import { GenresService } from './genres.service.js';

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

  @Post()
  addGenre(@Body() genre: CreateGenreDto): Promise<GenreEntity> {
    return this.genresService.addGenre(genre);
  }

  @Patch(':id')
  updateGenre(
    @Param('id') id: string,
    @Body() genre: UpdateGenreDto,
  ): Promise<GenreEntity> {
    return this.genresService.updateGenre(id, genre);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteGenre(@Param('id') id: string): Promise<void> {
    return this.genresService.deleteGenre(id);
  }
}
