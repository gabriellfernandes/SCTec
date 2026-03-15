import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../../contact/entity/contact.entity';
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

  async update(entity: EnterpriseEntity): Promise<EnterpriseEntity> {
    return this.repository.manager.transaction(async (transactionManager) => {
      await transactionManager
        .createQueryBuilder()
        .delete()
        .from(ContactEntity)
        .where('enterprise_id = :enterpriseId', { enterpriseId: entity.id })
        .execute();

      return transactionManager.save(EnterpriseEntity, entity);
    });
  }

  async delete(entity: EnterpriseEntity): Promise<void> {
    await this.repository.softDelete(entity.id);
  }
}
