import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WatchlistService } from './watchlist.service.js';
import { WatchlistEntity } from './entities/watchlist.entity.js';
import { UsersService } from '../users/users.service.js';
import { MoviesService } from '../movies/movies.service.js';

describe('WatchlistService', () => {
  let service: WatchlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchlistService,
        {
          provide: getRepositoryToken(WatchlistEntity),
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: MoviesService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<WatchlistService>(WatchlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
