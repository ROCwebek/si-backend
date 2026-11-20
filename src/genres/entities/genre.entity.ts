import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('genres')
export class GenreEntity {
  @PrimaryColumn('uuid')
  genre_pk: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;
}
