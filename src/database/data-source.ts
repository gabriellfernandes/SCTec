import 'dotenv/config';
import { DataSource } from 'typeorm';
import { UserEntity } from '../auth/user/entity/user.entity';
import { CityEntity } from '../enterprise/city/entity/city.entity';
import { ContactEntity } from '../enterprise/contact/entity/contact.entity';
import { EmailEntity } from '../enterprise/contact-email/entity/email.entity';
import { EnterpriseEntity } from '../enterprise/enterprise/entity/enterprise.entity';
import { PhoneEntity } from '../enterprise/contact-phone/entity/phone.entity';
import { SegmentEntity } from '../enterprise/segment/entity/segment.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'atec',
  entities: [
    EnterpriseEntity,
    UserEntity,
    CityEntity,
    SegmentEntity,
    ContactEntity,
    EmailEntity,
    PhoneEntity,
  ],
  migrations: ['src/database/migrations/*.ts', 'dist/database/migrations/*.js'],
  synchronize: false,
});
