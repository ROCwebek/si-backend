import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { vi } from 'vitest';
import { ReviewsService } from './reviews.service.js';
import { ReviewEntity } from './entities/review.entity.js';
import { WatchlistEntity } from '../watchlist/entities/watchlist.entity.js';
import { MoviesService } from '../movies/movies.service.js';

describe('ReviewsService', () => {
  let service: ReviewsService;

  // Stands in for the repository and manager that dataSource.transaction()
  // hands to its callback
  const reviewRepo = {
    existsBy: vi.fn(),
    create: vi.fn((data: object) => data),
    save: vi.fn(async (data: object) => ({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    })),
  };
  const manager = {
    getRepository: vi.fn(() => reviewRepo),
    delete: vi.fn(),
  };
  const dataSource = {
    transaction: vi.fn(async (work: (m: typeof manager) => unknown) =>
      work(manager),
    ),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(ReviewEntity),
          useValue: {},
        },
        {
          provide: MoviesService,
          useValue: { getMovieById: vi.fn() },
        },
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReview', () => {
    const dto = { rating: 4, review: 'God film' };

    it('saves the review and removes the movie from the watchlist in one transaction', async () => {
      reviewRepo.existsBy.mockResolvedValue(false);

      const result = await service.createReview('user-1', 'movie-1', dto);

      expect(dataSource.transaction).toHaveBeenCalledTimes(1);
      expect(manager.getRepository).toHaveBeenCalledWith(ReviewEntity);
      expect(reviewRepo.save).toHaveBeenCalledWith({
        user_fk: 'user-1',
        movie_fk: 'movie-1',
        ...dto,
      });
      expect(manager.delete).toHaveBeenCalledWith(WatchlistEntity, {
        user_fk: 'user-1',
        movie_fk: 'movie-1',
      });
      expect(result).toMatchObject({ movie_fk: 'movie-1', ...dto });
    });

    it('throws 409 and changes nothing if the user already reviewed the movie', async () => {
      reviewRepo.existsBy.mockResolvedValue(true);

      await expect(
        service.createReview('user-1', 'movie-1', dto),
      ).rejects.toThrow(ConflictException);

      expect(reviewRepo.save).not.toHaveBeenCalled();
      expect(manager.delete).not.toHaveBeenCalled();
    });
  });
});
