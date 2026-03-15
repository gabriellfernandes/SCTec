import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SegmentEntity } from '../entity/segment.entity';
import { EnterpriseEntity } from '../../enterprise/entity/enterprise.entity';

@Injectable()
export class SegmentManager {
  constructor(
    @InjectRepository(SegmentEntity)
    private readonly repository: Repository<SegmentEntity>,
    @InjectRepository(EnterpriseEntity)
    private readonly enterpriseRepository: Repository<EnterpriseEntity>,
  ) {}

  async create(entity: SegmentEntity): Promise<SegmentEntity> {
    await this.repository.save(entity);
    return entity;
  }

  update(entity: SegmentEntity): Promise<SegmentEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: SegmentEntity): Promise<void> {
    const linkedCount = await this.enterpriseRepository.count({
      where: {
        segment: { id: entity.id },
      },
    });

    if (linkedCount > 0) {
      throw new ConflictException(
        'Nao foi possivel excluir segmento porque existem empresas vinculadas',
      );
    }

    await this.repository.softDelete(entity.id);
  }
}
