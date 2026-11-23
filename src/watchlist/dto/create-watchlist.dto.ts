import { IsUUID } from 'class-validator';

export class CreateWatchlistDto {
  @IsUUID()
  movie_id: string;
}
