import {
  Entity,
  PrimaryColumn,
  Column,
  Check,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity.js';
import { MovieEntity } from '../../movies/entities/movie.entity.js';

// The composite primary key means a user can only review each movie once
@Entity('reviews')
@Check('CHK_review_rating_range', '"rating" BETWEEN 1 AND 5')
// The primary key (user_fk, movie_fk) only helps lookups that start with
// user_fk. This index covers lookups by movie alone: a movie's reviews,
// its average rating, and ON DELETE CASCADE when a movie is deleted.
@Index('idx_reviews_movie_fk', ['movie_fk'])
export class ReviewEntity {
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

  @Column({ type: 'smallint' })
  rating: number;

  @Column({ type: 'text' })
  review: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
