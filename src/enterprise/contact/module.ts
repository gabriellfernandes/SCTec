import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactCreateController } from './controller/create.controller';
import { ContactDeleteController } from './controller/delete.controller';
import { ContactReadController } from './controller/read.controller';
import { ContactUpdateController } from './controller/update.controller';
import { ContactEntity } from './entity/contact.entity';
import { ContactManager } from './service/manager';
import { ContactProvider } from './service/provider';
import { ContactRequestManager } from './service/request-manager';
import { ContactResponseMapper } from './service/response-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [
    ContactCreateController,
    ContactReadController,
    ContactUpdateController,
    ContactDeleteController,
  ],
  providers: [
    ContactManager,
    ContactProvider,
    ContactRequestManager,
    ContactResponseMapper,
  ],
  exports: [ContactProvider],
})
export class ContactModule {}
