import { Test, TestingModule } from '@nestjs/testing';
import {
  MovieReviewsController,
  ReviewsController,
} from './reviews.controller.js';
import { ReviewsService } from './reviews.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';

describe('Reviews controllers', () => {
  let movieReviewsController: MovieReviewsController;
  let reviewsController: ReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieReviewsController, ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    movieReviewsController = module.get(MovieReviewsController);
    reviewsController = module.get(ReviewsController);
  });

  it('should be defined', () => {
    expect(movieReviewsController).toBeDefined();
    expect(reviewsController).toBeDefined();
  });
});
