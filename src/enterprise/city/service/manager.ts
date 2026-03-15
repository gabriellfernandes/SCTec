import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../entity/city.entity';

@Injectable()
export class CityManager {
  constructor(
    @InjectRepository(CityEntity)
    private readonly repository: Repository<CityEntity>,
  ) {}

  async create(entity: CityEntity): Promise<CityEntity> {
    await this.repository.save(entity);
    return entity;
  }

  update(entity: CityEntity): Promise<CityEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: CityEntity): Promise<void> {
    await this.repository.softDelete(entity.id);
  }
}
