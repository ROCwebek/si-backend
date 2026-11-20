import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWatchlist1795088196685 implements MigrationInterface {
    name = 'CreateWatchlist1795088196685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "watchlist" ("user_fk" uuid NOT NULL, "movie_fk" uuid NOT NULL, "added_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f463cdbfbc6206ff15dec1b67fd" PRIMARY KEY ("user_fk", "movie_fk"))`);
        await queryRunner.query(`ALTER TABLE "watchlist" ADD CONSTRAINT "FK_9f193fb223e7a63ccdbc8722613" FOREIGN KEY ("user_fk") REFERENCES "users"("user_pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watchlist" ADD CONSTRAINT "FK_97b97395f6de25f44787745e840" FOREIGN KEY ("movie_fk") REFERENCES "movies"("movie_pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlist" DROP CONSTRAINT "FK_97b97395f6de25f44787745e840"`);
        await queryRunner.query(`ALTER TABLE "watchlist" DROP CONSTRAINT "FK_9f193fb223e7a63ccdbc8722613"`);
        await queryRunner.query(`DROP TABLE "watchlist"`);
    }

}
