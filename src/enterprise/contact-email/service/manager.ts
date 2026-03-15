import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailEntity } from '../entity/email.entity';

@Injectable()
export class ContactEmailManager {
  constructor(
    @InjectRepository(EmailEntity)
    private readonly repository: Repository<EmailEntity>,
  ) {}

  async create(entity: EmailEntity): Promise<EmailEntity> {
    await this.repository.save(entity);
    return entity;
  }

  update(entity: EmailEntity): Promise<EmailEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: EmailEntity): Promise<void> {
    await this.repository.softDelete(entity.id);
  }
}
