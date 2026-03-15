import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEnterpriseTable140320262205Api implements MigrationInterface {
  name = 'CreateEnterpriseTable140320262205Api';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "enterprise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "owner_name" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "city_id" uuid NOT NULL, "segment_id" uuid NOT NULL, CONSTRAINT "PK_enterprise_id" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "contact" ADD CONSTRAINT "FK_contact_enterprise" FOREIGN KEY ("enterprise_id") REFERENCES "enterprise"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "email" ADD CONSTRAINT "FK_email_contact" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "phone" ADD CONSTRAINT "FK_phone_contact" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprise" ADD CONSTRAINT "FK_enterprise_city" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprise" ADD CONSTRAINT "FK_enterprise_segment" FOREIGN KEY ("segment_id") REFERENCES "segment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "enterprise" DROP CONSTRAINT "FK_enterprise_segment"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprise" DROP CONSTRAINT "FK_enterprise_city"',
    );
    await queryRunner.query(
      'ALTER TABLE "phone" DROP CONSTRAINT "FK_phone_contact"',
    );
    await queryRunner.query(
      'ALTER TABLE "email" DROP CONSTRAINT "FK_email_contact"',
    );
    await queryRunner.query(
      'ALTER TABLE "contact" DROP CONSTRAINT "FK_contact_enterprise"',
    );
    await queryRunner.query('DROP TABLE "enterprise"');
  }
}
