import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreEntity } from './entities/genre.entity.js';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async getAllGenres(): Promise<GenreEntity[]> {
    return this.genreRepository.find({ order: { name: 'ASC' } });
  }

  async getGenreById(id: string): Promise<GenreEntity> {
    const genre = await this.genreRepository.findOneBy({ genre_pk: id });

    if (!genre) {
      throw new NotFoundException('Ingen genre blev fundet');
    }

    return genre;
  }
}
