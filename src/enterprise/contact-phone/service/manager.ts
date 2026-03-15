import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneEntity } from '../entity/phone.entity';

@Injectable()
export class ContactPhoneManager {
  constructor(
    @InjectRepository(PhoneEntity)
    private readonly repository: Repository<PhoneEntity>,
  ) {}

  async create(entity: PhoneEntity): Promise<PhoneEntity> {
    await this.repository.save(entity);
    return entity;
  }

  update(entity: PhoneEntity): Promise<PhoneEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: PhoneEntity): Promise<void> {
    await this.repository.softDelete(entity.id);
  }
}
