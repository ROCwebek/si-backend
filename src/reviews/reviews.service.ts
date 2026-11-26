import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity.js';
import { WatchlistEntity } from '../watchlist/entities/watchlist.entity.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { MoviesService } from '../movies/movies.service.js';
import type { LoglistReview, MyReview, Review } from './types/review.type.js';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly moviesService: MoviesService,
    private readonly dataSource: DataSource,
  ) {}

  async getReviewsForMovie(movieId: string): Promise<Review[]> {
    // Throws 404 if the movie does not exist
    await this.moviesService.getMovieById(movieId);

    const reviews = await this.reviewRepository.find({
      where: { movie_fk: movieId },
      relations: { user: true },
      order: { created_at: 'DESC' },
    });

    // Only the reviewer's id and name are sent, never email, password etc.
    return reviews.map((r) => ({
      user_pk: r.user_fk,
      user_name: r.user.user_name,
      rating: r.rating,
      review: r.review,
      created_at: r.created_at,
    }));
  }

  // The loglist: all of the user's own reviews, newest first
  async getMyReviews(userId: string): Promise<LoglistReview[]> {
    const reviews = await this.reviewRepository.find({
      where: { user_fk: userId },
      relations: { movie: true },
      order: { created_at: 'DESC' },
    });

    return reviews.map((r) => ({
      ...this.toMyReview(r),
      movie: {
        title: r.movie.title,
        release_year: r.movie.release_year,
        poster_url: r.movie.poster_url,
      },
    }));
  }

  // Reviewing a movie puts it on the loglist and takes it off the watchlist.
  async createReview(
    userId: string,
    movieId: string,
    dto: CreateReviewDto,
  ): Promise<MyReview> {
    // Throws 404 if the movie does not exist
    await this.moviesService.getMovieById(movieId);

    const review = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        const reviewRepo =
          transactionalEntityManager.getRepository(ReviewEntity);

        const exists = await reviewRepo.existsBy({
          user_fk: userId,
          movie_fk: movieId,
        });

        if (exists) {
          throw new ConflictException('Du har allerede anmeldt denne film');
        }

        const saved = await reviewRepo.save(
          reviewRepo.create({
            user_fk: userId,
            movie_fk: movieId,
            rating: dto.rating,
            review: dto.review,
          }),
        );

        await transactionalEntityManager.delete(WatchlistEntity, {
          user_fk: userId,
          movie_fk: movieId,
        });

        return saved;
      },
    );

    return this.toMyReview(review);
  }

  async updateMyReview(
    userId: string,
    movieId: string,
    dto: UpdateReviewDto,
  ): Promise<MyReview> {
    const review = await this.findOwnReview(userId, movieId);

    if (dto.rating !== undefined) review.rating = dto.rating;
    if (dto.review !== undefined) review.review = dto.review;

    return this.toMyReview(await this.reviewRepository.save(review));
  }

  async deleteMyReview(userId: string, movieId: string): Promise<void> {
    const result = await this.reviewRepository.delete({
      user_fk: userId,
      movie_fk: movieId,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Du har ikke anmeldt denne film');
    }
  }

  // Admin: remove any user's review, e.g. an inappropriate one
  async deleteReviewAsAdmin(userId: string, movieId: string): Promise<void> {
    const result = await this.reviewRepository.delete({
      user_fk: userId,
      movie_fk: movieId,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Anmeldelsen blev ikke fundet');
    }
  }

  private async findOwnReview(
    userId: string,
    movieId: string,
  ): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOneBy({
      user_fk: userId,
      movie_fk: movieId,
    });

    if (!review) {
      throw new NotFoundException('Du har ikke anmeldt denne film');
    }

    return review;
  }

  private toMyReview(r: ReviewEntity): MyReview {
    return {
      movie_fk: r.movie_fk,
      rating: r.rating,
      review: r.review,
      created_at: r.created_at,
      updated_at: r.updated_at,
    };
  }
}
