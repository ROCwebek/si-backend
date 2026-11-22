import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  HttpCode,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.type.js';
import type { LoglistReview, MyReview, Review } from './types/review.type.js';

// Reviews on a movie's single view.
// The reviewer is always the logged-in user (from the JWT), never the body.
@Controller('movies/:movieId/reviews')
export class MovieReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Public: anyone can read the reviews on a movie
  @Get()
  getReviewsForMovie(
    @Param('movieId', ParseUUIDPipe) movieId: string,
  ): Promise<Review[]> {
    return this.reviewsService.getReviewsForMovie(movieId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyReview(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<MyReview> {
    return this.reviewsService.getMyReviewForMovie(req.user.sub, movieId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createReview(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateReviewDto,
  ): Promise<MyReview> {
    return this.reviewsService.createReview(req.user.sub, movieId, dto);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateMyReview(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateReviewDto,
  ): Promise<MyReview> {
    return this.reviewsService.updateMyReview(req.user.sub, movieId, dto);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  deleteMyReview(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.reviewsService.deleteMyReview(req.user.sub, movieId);
  }
}

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // The logged-in user's loglist. Each entry has movie_fk, so editing and
  // deleting from the loglist uses PATCH/DELETE /movies/:movieId/reviews/me.
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyReviews(@Req() req: AuthenticatedRequest): Promise<LoglistReview[]> {
    return this.reviewsService.getMyReviews(req.user.sub);
  }

  // Admin: remove any review, e.g. an inappropriate one
  @Delete(':reviewId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(204)
  deleteReview(
    @Param('reviewId', ParseUUIDPipe) reviewId: string,
  ): Promise<void> {
    return this.reviewsService.deleteReviewById(reviewId);
  }
}
