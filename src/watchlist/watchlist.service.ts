import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchlistEntity } from './entities/watchlist.entity.js';
import { UsersService } from '../users/users.service.js';
import { MoviesService } from '../movies/movies.service.js';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(WatchlistEntity)
    private readonly watchlistRepository: Repository<WatchlistEntity>,
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService,
  ) {}

  async getWatchlist(userId: string): Promise<WatchlistEntity[]> {
    // Throws 404 if the user does not exist
    await this.usersService.getUserById(userId);

    return this.watchlistRepository.find({
      where: { user_fk: userId },
      relations: { movie: { genres: true } },
      order: { added_at: 'DESC' },
    });
  }

  // Idempotent: adding a movie that is already on the list does nothing
  async addToWatchlist(userId: string, movieId: string): Promise<void> {
    // Both throw 404 if the user or movie does not exist
    await this.usersService.getUserById(userId);
    await this.moviesService.getMovieById(movieId);

    await this.watchlistRepository
      .createQueryBuilder()
      .insert()
      .into(WatchlistEntity)
      .values({ user_fk: userId, movie_fk: movieId })
      .orIgnore()
      .execute();
  }

  async removeFromWatchlist(userId: string, movieId: string): Promise<void> {
    const result = await this.watchlistRepository.delete({
      user_fk: userId,
      movie_fk: movieId,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Filmen er ikke på watchlisten');
    }
  }
}
