import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1794925730493 implements MigrationInterface {
    name = 'Initial1794925730493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" ("movie_pk" uuid NOT NULL, "title" character varying(179) NOT NULL, "release_year" integer NOT NULL, "description" text, "runtime_minutes" integer, "poster_url" text, CONSTRAINT "PK_bbb6793855ea926e0f70be6336e" PRIMARY KEY ("movie_pk"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("role_pk" uuid NOT NULL, "role" character varying(10) NOT NULL, CONSTRAINT "UQ_ccc7c1489f3a6b3c9b47d4537c5" UNIQUE ("role"), CONSTRAINT "PK_3cbe7c76b79f137e0ea83691f8e" PRIMARY KEY ("role_pk"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_pk" uuid NOT NULL, "user_email" character varying(255) NOT NULL, "user_name" character varying(20) NOT NULL, "user_password" character varying(255) NOT NULL, "verification_key" uuid, "reset_password_key" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "verified_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "role_fk" uuid NOT NULL, CONSTRAINT "UQ_643a0bfb9391001cf11e581bdd6" UNIQUE ("user_email"), CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "UQ_eacef730e0830f2803180104120" UNIQUE ("reset_password_key"), CONSTRAINT "PK_7bf20d6ce493ac5c4f265d61529" PRIMARY KEY ("user_pk"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_799310498453bb20447bc5996e9" FOREIGN KEY ("role_fk") REFERENCES "roles"("role_pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_799310498453bb20447bc5996e9"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
