import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnterpriseEntity } from '../entity/enterprise.entity';

@Injectable()
export class EnterpriseManager {
  constructor(
    @InjectRepository(EnterpriseEntity)
    private readonly repository: Repository<EnterpriseEntity>,
  ) {}

  async create(entity: EnterpriseEntity): Promise<EnterpriseEntity> {
    await this.repository.save(entity);
    return entity;
  }

  update(entity: EnterpriseEntity): Promise<EnterpriseEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: EnterpriseEntity): Promise<void> {
    await this.repository.softDelete(entity.id);
  }
}
