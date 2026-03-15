import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SegmentEntity } from '../entity/segment.entity';

@Injectable()
export class SegmentManager {
  constructor(
    @InjectRepository(SegmentEntity)
    private readonly repository: Repository<SegmentEntity>,
  ) {}

  async create(entity: SegmentEntity): Promise<SegmentEntity> {
    await this.repository.save(entity);
    return entity;
  }

  update(entity: SegmentEntity): Promise<SegmentEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: SegmentEntity): Promise<void> {
    await this.repository.softDelete(entity.id);
  }
}
