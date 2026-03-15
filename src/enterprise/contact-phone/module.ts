import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactPhoneCreateController } from './controller/create.controller';
import { ContactPhoneDeleteController } from './controller/delete.controller';
import { ContactPhoneReadController } from './controller/read.controller';
import { ContactPhoneUpdateController } from './controller/update.controller';
import { PhoneEntity } from './entity/phone.entity';
import { ContactPhoneManager } from './service/manager';
import { ContactPhoneProvider } from './service/provider';
import { ContactPhoneRequestManager } from './service/request-manager';
import { ContactPhoneResponseMapper } from './service/response-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity])],
  controllers: [
    ContactPhoneCreateController,
    ContactPhoneReadController,
    ContactPhoneUpdateController,
    ContactPhoneDeleteController,
  ],
  providers: [
    ContactPhoneManager,
    ContactPhoneProvider,
    ContactPhoneRequestManager,
    ContactPhoneResponseMapper,
  ],
  exports: [ContactPhoneProvider],
})
export class ContactPhoneModule {}
