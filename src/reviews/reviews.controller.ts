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
// The reviewer is always the logged-in user (from the JWT), never the URL or
// body. A user has at most one review per movie, so /my-review is
// "my review of this movie".
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

  @Post()
  @UseGuards(JwtAuthGuard)
  createReview(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateReviewDto,
  ): Promise<MyReview> {
    return this.reviewsService.createReview(req.user.sub, movieId, dto);
  }

  @Patch('my-review')
  @UseGuards(JwtAuthGuard)
  updateMyReview(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateReviewDto,
  ): Promise<MyReview> {
    return this.reviewsService.updateMyReview(req.user.sub, movieId, dto);
  }

  @Delete('my-review')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  deleteMyReview(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.reviewsService.deleteMyReview(req.user.sub, movieId);
  }

  // Admin: remove any user's review, e.g. an inappropriate one
  @Delete(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(204)
  deleteReview(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return this.reviewsService.deleteReviewAsAdmin(userId, movieId);
  }
}

@Controller('loglist')
export class LoglistController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // The logged-in user's loglist. Each entry has movie_fk, so editing and
  // deleting from the loglist uses PATCH/DELETE /movies/:movieId/reviews/my-review.
  @Get()
  @UseGuards(JwtAuthGuard)
  getMyReviews(@Req() req: AuthenticatedRequest): Promise<LoglistReview[]> {
    return this.reviewsService.getMyReviews(req.user.sub);
  }
}
