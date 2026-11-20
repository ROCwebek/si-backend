import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTitleSearchIndex1795005643102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "idx_movies_title_fts" ON "movies" USING gin (to_tsvector('simple', "title"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_movies_title_fts"`);
  }
}
