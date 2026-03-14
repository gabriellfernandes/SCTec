import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractProvider,
  PageResult,
} from '../../../shared/service/abstract-provider';
import { Repository } from 'typeorm';
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

  findAll(
    search: EnterpriseSearchRequest,
  ): Promise<PageResult<EnterpriseEntity>> {
    const where = this.mapSearchQuery<keyof EnterpriseEntity>(search, [
      'city',
      'segment',
    ]);

    const orderField =
      search.sort === 'ownerName' ||
      search.sort === 'city' ||
      search.sort === 'segment'
        ? search.sort
        : 'name';
    const orderDirection = search.order ?? 'ASC';
    const order = { [orderField]: orderDirection } as Record<
      string,
      'ASC' | 'DESC'
    >;

    if (Object.keys(where).length === 0) {
      return this.findPage({
        page: search.page,
        limit: search.limit,
        order,
      });
    }

    return this.findPage({
      page: search.page,
      limit: search.limit,
      where,
      order,
    });
  }
}
