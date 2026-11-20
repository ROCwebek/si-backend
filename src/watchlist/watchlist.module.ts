import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchlistService } from './watchlist.service.js';
import { WatchlistController } from './watchlist.controller.js';
import { WatchlistEntity } from './entities/watchlist.entity.js';
import { UsersModule } from '../users/users.module.js';
import { MoviesModule } from '../movies/movies.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([WatchlistEntity]),
    UsersModule,
    MoviesModule,
  ],
  controllers: [WatchlistController],
  providers: [WatchlistService],
})
export class WatchlistModule {}
