import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractProvider,
  PageResult,
} from '../../../shared/service/abstract-provider';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
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
    const where: FindOptionsWhere<EnterpriseEntity> = {};

    if (search.cityId) {
      where.city = { id: search.cityId };
    }

    if (search.segmentId) {
      where.segment = { id: search.segmentId };
    }

    return this.findPage({
      page: search.page,
      limit: search.limit,
      where,
      order: this.resolveOrder(search.sort, search.order),
      relations: this.defaultRelations(),
    });
  }

  private resolveOrder(
    sort?: string,
    order?: 'ASC' | 'DESC',
  ): FindOptionsOrder<EnterpriseEntity> {
    const direction = order ?? 'ASC';

    if (sort === 'ownerName' || sort === 'active') {
      return { [sort]: direction };
    }

    return { name: direction };
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
