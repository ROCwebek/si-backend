import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service.js';
import { WatchlistEntity } from './entities/watchlist.entity.js';
import { CreateWatchlistDto } from './dto/create-watchlist.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.type.js';

// The logged-in user's own watchlist.
// The user always comes from the JWT, never the URL, so nobody can see or
// change someone else's watchlist.
@Controller('watchlist')
@UseGuards(JwtAuthGuard)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Get()
  getWatchlist(@Req() req: AuthenticatedRequest): Promise<WatchlistEntity[]> {
    return this.watchlistService.getWatchlist(req.user.sub);
  }

  @Post()
  addToWatchlist(
    @Req() req: AuthenticatedRequest,
    @Body() body: CreateWatchlistDto,
  ): Promise<void> {
    return this.watchlistService.addToWatchlist(req.user.sub, body.movie_id);
  }

  @Delete(':movieId')
  @HttpCode(204)
  removeFromWatchlist(
    @Req() req: AuthenticatedRequest,
    @Param('movieId', ParseUUIDPipe) movieId: string,
  ): Promise<void> {
    return this.watchlistService.removeFromWatchlist(req.user.sub, movieId);
  }
}
