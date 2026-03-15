import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactTable140320262202Api implements MigrationInterface {
  name = 'CreateContactTable140320262202Api';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "enterprise_id" uuid NOT NULL, CONSTRAINT "PK_contact_id" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "contact"');
  }
}
