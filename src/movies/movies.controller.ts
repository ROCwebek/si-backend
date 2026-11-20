import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';
import { UpdateMovieDto } from './dto/update-movie.dto.js';
import { HttpCode } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UseGuards } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(@Query('search') search?: string) {
    return this.moviesService.getAllMovies(search);
  }

  @Get(':id')
  getMoviesById(@Param('id') id: string): Promise<MovieEntity> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') 
  addMovie(@Body() movie: CreateMovieDto): Promise<MovieEntity> {
    return this.moviesService.addMovie(movie);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') 
  updateMovie(
    @Param('id') id: string,
    @Body() movie: UpdateMovieDto,
  ): Promise<MovieEntity> {
    return this.moviesService.updateMovie(id, movie);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') 
  @HttpCode(204)
  deleteMovie(@Param('id') id: string): Promise<void> {
    return this.moviesService.deleteMovie(id);
  }
}
