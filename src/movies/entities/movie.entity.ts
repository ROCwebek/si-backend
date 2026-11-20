import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { GenreEntity } from '../../genres/entities/genre.entity.js';

@Index('idx_movies_title_fts', { synchronize: false })
@Entity('movies')
export class MovieEntity {
  @PrimaryColumn('uuid')
  movie_pk: string;

  @Column({ type: 'varchar', length: 179 })
  title: string;

  @Column({ type: 'integer' })
  release_year: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'integer', nullable: true })
  runtime_minutes: number | null;

  @Column({ type: 'text', nullable: true })
  poster_url: string | null;

  @ManyToMany(() => GenreEntity)
  @JoinTable({
    name: 'movie_genres',
    joinColumn: { name: 'movie_fk', referencedColumnName: 'movie_pk' },
    inverseJoinColumn: { name: 'genre_fk', referencedColumnName: 'genre_pk' },
  })
  genres: GenreEntity[];
}
