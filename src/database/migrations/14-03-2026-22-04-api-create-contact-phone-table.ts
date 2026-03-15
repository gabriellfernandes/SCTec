import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactPhoneTable140320262204Api implements MigrationInterface {
  name = 'CreateContactPhoneTable140320262204Api';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "phone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "contact_id" uuid NOT NULL, CONSTRAINT "PK_phone_id" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "phone"');
  }
}
