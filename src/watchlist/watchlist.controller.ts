import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service.js';
import { WatchlistEntity } from './entities/watchlist.entity.js';
import { CreateWatchlistDto } from './dto/create-watchlist.dto.js';

@Controller('users/:userId/watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Get()
  getWatchlist(@Param('userId') userId: string): Promise<WatchlistEntity[]> {
    return this.watchlistService.getWatchlist(userId);
  }

  @Post()
  addToWatchlist(
    @Param('userId') userId: string,
    @Body() body: CreateWatchlistDto,
  ): Promise<void> {
    return this.watchlistService.addToWatchlist(userId, body.movie_id);
  }

  @Delete(':movieId')
  @HttpCode(204)
  removeFromWatchlist(
    @Param('userId') userId: string,
    @Param('movieId') movieId: string,
  ): Promise<void> {
    return this.watchlistService.removeFromWatchlist(userId, movieId);
  }
}
