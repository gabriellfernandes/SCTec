import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityCreateController } from './controller/create.controller';
import { CityDeleteController } from './controller/delete.controller';
import { CityReadController } from './controller/read.controller';
import { CityUpdateController } from './controller/update.controller';
import { CityEntity } from './entity/city.entity';
import { CityManager } from './service/manager';
import { CityProvider } from './service/provider';
import { CityRequestManager } from './service/request-manager';
import { CityResponseMapper } from './service/response-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [
    CityCreateController,
    CityReadController,
    CityUpdateController,
    CityDeleteController,
  ],
  providers: [
    CityManager,
    CityProvider,
    CityRequestManager,
    CityResponseMapper,
  ],
  exports: [CityProvider],
})
export class CityModule {}
