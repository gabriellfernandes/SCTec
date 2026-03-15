import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegmentCreateController } from './controller/create.controller';
import { SegmentDeleteController } from './controller/delete.controller';
import { SegmentReadController } from './controller/read.controller';
import { SegmentUpdateController } from './controller/update.controller';
import { SegmentEntity } from './entity/segment.entity';
import { SegmentManager } from './service/manager';
import { SegmentProvider } from './service/provider';
import { SegmentRequestManager } from './service/request-manager';
import { SegmentResponseMapper } from './service/response-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([SegmentEntity])],
  controllers: [
    SegmentCreateController,
    SegmentReadController,
    SegmentUpdateController,
    SegmentDeleteController,
  ],
  providers: [
    SegmentManager,
    SegmentProvider,
    SegmentRequestManager,
    SegmentResponseMapper,
  ],
  exports: [SegmentProvider],
})
export class SegmentModule {}
