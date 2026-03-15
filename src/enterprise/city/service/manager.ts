import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../entity/city.entity';
import { EnterpriseEntity } from '../../enterprise/entity/enterprise.entity';

@Injectable()
export class CityManager {
  constructor(
    @InjectRepository(CityEntity)
    private readonly repository: Repository<CityEntity>,
    @InjectRepository(EnterpriseEntity)
    private readonly enterpriseRepository: Repository<EnterpriseEntity>,
  ) {}

  async create(entity: CityEntity): Promise<CityEntity> {
    await this.repository.save(entity);
    return entity;
  }

  update(entity: CityEntity): Promise<CityEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: CityEntity): Promise<void> {
    const linkedCount = await this.enterpriseRepository.count({
      where: {
        city: { id: entity.id },
      },
    });

    if (linkedCount > 0) {
      throw new ConflictException(
        'Nao foi possivel excluir municipio porque existem empresas vinculadas',
      );
    }

    await this.repository.softDelete(entity.id);
  }
}
