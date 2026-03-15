import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEmailCreateController } from './controller/create.controller';
import { ContactEmailDeleteController } from './controller/delete.controller';
import { ContactEmailReadController } from './controller/read.controller';
import { ContactEmailUpdateController } from './controller/update.controller';
import { EmailEntity } from './entity/email.entity';
import { ContactEmailManager } from './service/manager';
import { ContactEmailProvider } from './service/provider';
import { ContactEmailRequestManager } from './service/request-manager';
import { ContactEmailResponseMapper } from './service/response-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([EmailEntity])],
  controllers: [
    ContactEmailCreateController,
    ContactEmailReadController,
    ContactEmailUpdateController,
    ContactEmailDeleteController,
  ],
  providers: [
    ContactEmailManager,
    ContactEmailProvider,
    ContactEmailRequestManager,
    ContactEmailResponseMapper,
  ],
  exports: [ContactEmailProvider],
})
export class ContactEmailModule {}
