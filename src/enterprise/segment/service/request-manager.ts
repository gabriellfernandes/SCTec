import { Injectable } from '@nestjs/common';
import { SegmentRequest } from '../dto/segment.request';
import { SegmentEntity } from '../entity/segment.entity';
import { SegmentManager } from './manager';
import { SegmentProvider } from './provider';

@Injectable()
export class SegmentRequestManager {
  constructor(
    private readonly manager: SegmentManager,
    private readonly provider: SegmentProvider,
  ) {}

  create(request: SegmentRequest): Promise<SegmentEntity> {
    const entity = new SegmentEntity();
    this.mapRequestData(entity, request);
    return this.manager.create(entity);
  }

  async update(id: string, request: SegmentRequest): Promise<SegmentEntity> {
    const entity = await this.provider.findById(id, 'Segment not found');
    this.mapRequestData(entity, request);
    return this.manager.update(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.provider.findById(id, 'Segment not found');
    await this.manager.delete(entity);
  }

  mapRequestData(entity: SegmentEntity, request: SegmentRequest): void {
    entity.name = request.name;
  }
}
