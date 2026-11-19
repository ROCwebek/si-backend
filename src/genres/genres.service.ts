import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';
import { GenreEntity } from './entities/genre.entity.js';

const PG_UNIQUE_VIOLATION = '23505';

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

  async addGenre(genre: CreateGenreDto): Promise<GenreEntity> {
    const newGenre = this.genreRepository.create({
      genre_pk: uuidv4(),
      name: genre.name.trim(),
    });

    return this.saveOrThrowConflict(newGenre);
  }

  async updateGenre(id: string, genre: UpdateGenreDto): Promise<GenreEntity> {
    const existingGenre = await this.genreRepository.findOneBy({
      genre_pk: id,
    });

    if (!existingGenre) {
      throw new NotFoundException('Ingen genre at opdatere');
    }

    if (genre.name !== undefined) {
      existingGenre.name = genre.name.trim();
    }

    return this.saveOrThrowConflict(existingGenre);
  }

  async deleteGenre(id: string): Promise<void> {
    const result = await this.genreRepository.delete({ genre_pk: id });

    if (result.affected === 0) {
      throw new NotFoundException('Ingen genre at slette');
    }
  }

  private async saveOrThrowConflict(genre: GenreEntity): Promise<GenreEntity> {
    try {
      return await this.genreRepository.save(genre);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string })?.code === PG_UNIQUE_VIOLATION
      ) {
        throw new ConflictException('En genre med det navn findes allerede');
      }
      throw error;
    }
  }
}
