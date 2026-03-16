import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserManager {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(entity: UserEntity): Promise<UserEntity> {
    await this.repository.save(entity);
    return entity;
  }

  update(entity: UserEntity): Promise<UserEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: UserEntity): Promise<void> {
    await this.repository.softDelete(entity.id);
  }
}
