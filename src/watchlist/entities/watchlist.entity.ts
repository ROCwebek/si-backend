import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity.js';
import { MovieEntity } from '../../movies/entities/movie.entity.js';

@Entity('watchlist')
export class WatchlistEntity {
  @PrimaryColumn('uuid')
  user_fk: string;

  @PrimaryColumn('uuid')
  movie_fk: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_fk', referencedColumnName: 'user_pk' })
  user: UserEntity;

  @ManyToOne(() => MovieEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_fk', referencedColumnName: 'movie_pk' })
  movie: MovieEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  added_at: Date;
}
