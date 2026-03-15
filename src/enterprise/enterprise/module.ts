import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseCreateController } from './controller/create.controller';
import { EnterpriseDeleteController } from './controller/delete.controller';
import { EnterpriseReadController } from './controller/read.controller';
import { EnterpriseUpdateController } from './controller/update.controller';
import { CityEntity } from '../city/entity/city.entity';
import { ContactEntity } from '../contact/entity/contact.entity';
import { EmailEntity } from '../contact-email/entity/email.entity';
import { EnterpriseEntity } from './entity/enterprise.entity';
import { PhoneEntity } from '../contact-phone/entity/phone.entity';
import { SegmentEntity } from '../segment/entity/segment.entity';
import { EnterpriseManager } from './service/manager';
import { EnterpriseProvider } from './service/provider';
import { EnterpriseRequestManager } from './service/request-manager';
import { EnterpriseResponseMapper } from './service/response-mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EnterpriseEntity,
      CityEntity,
      SegmentEntity,
      ContactEntity,
      EmailEntity,
      PhoneEntity,
    ]),
  ],
  controllers: [
    EnterpriseCreateController,
    EnterpriseReadController,
    EnterpriseUpdateController,
    EnterpriseDeleteController,
  ],
  providers: [
    EnterpriseManager,
    EnterpriseProvider,
    EnterpriseRequestManager,
    EnterpriseResponseMapper,
  ],
})
export class EnterpriseModule {}
