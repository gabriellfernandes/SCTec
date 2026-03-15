import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSegmentTable140320262201Api implements MigrationInterface {
  name = 'CreateSegmentTable140320262201Api';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "segment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_segment_name" UNIQUE ("name"), CONSTRAINT "PK_segment_id" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "segment"');
  }
}
