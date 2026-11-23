import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviews1795437086004 implements MigrationInterface {
    name = 'CreateReviews1795437086004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("user_fk" uuid NOT NULL, "movie_fk" uuid NOT NULL, "rating" smallint NOT NULL, "review" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "CHK_review_rating_range" CHECK ("rating" BETWEEN 1 AND 5), CONSTRAINT "PK_428b6c4dc8f646920c5ae904c82" PRIMARY KEY ("user_fk", "movie_fk"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_abb5f8742dc0531802681f62a3f" FOREIGN KEY ("user_fk") REFERENCES "users"("user_pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_3fce8ace2573ae80dec62466baf" FOREIGN KEY ("movie_fk") REFERENCES "movies"("movie_pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_3fce8ace2573ae80dec62466baf"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_abb5f8742dc0531802681f62a3f"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
