import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service.js';
import {
  MovieReviewsController,
  LoglistController,
} from './reviews.controller.js';
import { ReviewEntity } from './entities/review.entity.js';
import { MoviesModule } from '../movies/movies.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]), MoviesModule, AuthModule],
  controllers: [MovieReviewsController, LoglistController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
