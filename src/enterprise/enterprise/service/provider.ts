import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractProvider,
  PageResult,
} from '../../../shared/service/abstract-provider';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  Repository,
} from 'typeorm';
import { EnterpriseSearchRequest } from '../dto/enterprise.search-request';
import { EnterpriseEntity } from '../entity/enterprise.entity';

@Injectable()
export class EnterpriseProvider extends AbstractProvider<EnterpriseEntity> {
  constructor(
    @InjectRepository(EnterpriseEntity)
    repository: Repository<EnterpriseEntity>,
  ) {
    super(repository);
  }

  findByIdOrNull(id: string): Promise<EnterpriseEntity | null> {
    return this.findOne({
      where: { id },
      relations: this.defaultRelations(),
    });
  }

  findAll(
    search: EnterpriseSearchRequest,
  ): Promise<PageResult<EnterpriseEntity>> {
    const page = search.page && search.page > 0 ? search.page : 1;
    const limit = search.limit && search.limit > 0 ? Math.min(search.limit, 100) : 10;

    const queryBuilder = this.repository
      .createQueryBuilder('enterprise')
      .leftJoinAndSelect('enterprise.city', 'city', 'city.deletedAt IS NULL')
      .leftJoinAndSelect('enterprise.segment', 'segment', 'segment.deletedAt IS NULL')
      .leftJoinAndSelect('enterprise.contacts', 'contact')
      .leftJoinAndSelect('contact.emails', 'email')
      .leftJoinAndSelect('contact.phones', 'phone')
      .where('enterprise.deletedAt IS NULL')
      .andWhere('city.id IS NOT NULL')
      .andWhere('segment.id IS NOT NULL')
      .distinct(true);

    if (search.cityId) {
      queryBuilder.andWhere('city.id = :cityId', { cityId: search.cityId });
    }

    if (search.segmentId) {
      queryBuilder.andWhere('segment.id = :segmentId', {
        segmentId: search.segmentId,
      });
    }

    this.applyOrder(queryBuilder, search.sort, search.order);

    queryBuilder.skip((page - 1) * limit).take(limit);

    return queryBuilder.getManyAndCount().then(([items, total]) => ({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }));
  }

  private applyOrder(
    queryBuilder: ReturnType<Repository<EnterpriseEntity>['createQueryBuilder']>,
    sort?: string,
    order?: 'ASC' | 'DESC',
  ): void {
    const direction = order ?? 'ASC';

    if (sort === 'ownerName') {
      queryBuilder.orderBy('enterprise.ownerName', direction);
      return;
    }

    if (sort === 'active') {
      queryBuilder.orderBy('enterprise.active', direction);
      return;
    }

    if (sort === 'cityName') {
      queryBuilder.orderBy('city.name', direction);
      return;
    }

    if (sort === 'segmentName') {
      queryBuilder.orderBy('segment.name', direction);
      return;
    }

    queryBuilder.orderBy('enterprise.name', direction);
  }

  private defaultRelations(): FindOptionsRelations<EnterpriseEntity> {
    return {
      city: true,
      segment: true,
      contacts: {
        emails: true,
        phones: true,
      },
    };
  }
}
