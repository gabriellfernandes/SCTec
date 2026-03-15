import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../entity/contact.entity';

@Injectable()
export class ContactManager {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly repository: Repository<ContactEntity>,
  ) {}

  async create(entity: ContactEntity): Promise<ContactEntity> {
    await this.repository.save(entity);
    return entity;
  }

  update(entity: ContactEntity): Promise<ContactEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: ContactEntity): Promise<void> {
    await this.repository.softDelete(entity.id);
  }
}
