import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContactNameDepartment160320260040Api
  implements MigrationInterface
{
  name = 'AddContactNameDepartment160320260040Api';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "contact" ADD "name" character varying');
    await queryRunner.query('ALTER TABLE "contact" ADD "department" character varying');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "contact" DROP COLUMN "department"');
    await queryRunner.query('ALTER TABLE "contact" DROP COLUMN "name"');
  }
}
