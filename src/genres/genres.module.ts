import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './entities/genre.entity.js';
import { GenresController } from './genres.controller.js';
import { GenresService } from './genres.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  providers: [GenresService],
  controllers: [GenresController],
})
export class GenresModule {}
