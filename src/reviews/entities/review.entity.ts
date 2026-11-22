import {
  Entity,
  PrimaryColumn,
  Column,
  Check,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity.js';
import { MovieEntity } from '../../movies/entities/movie.entity.js';

@Entity('reviews')
@Check('CHK_review_rating_range', '"rating" BETWEEN 1 AND 5')
// A user can only review each movie once
@Unique('UQ_review_user_movie', ['user_fk', 'movie_fk'])
export class ReviewEntity {
  @PrimaryColumn('uuid')
  review_pk: string;

  @Column('uuid')
  user_fk: string;

  @Column('uuid')
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
