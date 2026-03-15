import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactEmailTable140320262203Api implements MigrationInterface {
  name = 'CreateContactEmailTable140320262203Api';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "email" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "contact_id" uuid NOT NULL, CONSTRAINT "PK_email_id" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "email"');
  }
}
