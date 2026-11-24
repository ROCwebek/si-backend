import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMovieFkIndexes1795510522779 implements MigrationInterface {
    name = 'AddMovieFkIndexes1795510522779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_reviews_movie_fk" ON "reviews"  ("movie_fk") `);
        await queryRunner.query(`CREATE INDEX "idx_watchlist_movie_fk" ON "watchlist"  ("movie_fk") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_watchlist_movie_fk"`);
        await queryRunner.query(`DROP INDEX "public"."idx_reviews_movie_fk"`);
    }

}
