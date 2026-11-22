import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviews1795346252807 implements MigrationInterface {
    name = 'CreateReviews1795346252807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("review_pk" uuid NOT NULL, "user_fk" uuid NOT NULL, "movie_fk" uuid NOT NULL, "rating" smallint NOT NULL, "review" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_review_user_movie" UNIQUE ("user_fk", "movie_fk"), CONSTRAINT "CHK_review_rating_range" CHECK ("rating" BETWEEN 1 AND 5), CONSTRAINT "PK_bd747873cbe50ea2f6a7d7985d0" PRIMARY KEY ("review_pk"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_abb5f8742dc0531802681f62a3f" FOREIGN KEY ("user_fk") REFERENCES "users"("user_pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_3fce8ace2573ae80dec62466baf" FOREIGN KEY ("movie_fk") REFERENCES "movies"("movie_pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_3fce8ace2573ae80dec62466baf"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_abb5f8742dc0531802681f62a3f"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
