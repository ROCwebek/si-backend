import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGenres1795082672903 implements MigrationInterface {
    name = 'CreateGenres1795082672903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genres" ("genre_pk" uuid NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"), CONSTRAINT "PK_6c160ff26e60a619ce4253584a8" PRIMARY KEY ("genre_pk"))`);
        await queryRunner.query(`CREATE TABLE "movie_genres" ("movie_fk" uuid NOT NULL, "genre_fk" uuid NOT NULL, CONSTRAINT "PK_e98195894d48d5bd2eb3127274d" PRIMARY KEY ("movie_fk", "genre_fk"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c018fb336ec539bdd9144dccdc" ON "movie_genres"  ("movie_fk") `);
        await queryRunner.query(`CREATE INDEX "IDX_3595d053e40ef00b2281b5c65e" ON "movie_genres"  ("genre_fk") `);
        await queryRunner.query(`ALTER TABLE "movie_genres" ADD CONSTRAINT "FK_c018fb336ec539bdd9144dccdc5" FOREIGN KEY ("movie_fk") REFERENCES "movies"("movie_pk") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_genres" ADD CONSTRAINT "FK_3595d053e40ef00b2281b5c65ef" FOREIGN KEY ("genre_fk") REFERENCES "genres"("genre_pk") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_genres" DROP CONSTRAINT "FK_3595d053e40ef00b2281b5c65ef"`);
        await queryRunner.query(`ALTER TABLE "movie_genres" DROP CONSTRAINT "FK_c018fb336ec539bdd9144dccdc5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3595d053e40ef00b2281b5c65e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c018fb336ec539bdd9144dccdc"`);
        await queryRunner.query(`DROP TABLE "movie_genres"`);
        await queryRunner.query(`DROP TABLE "genres"`);
    }

}
