import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractProvider,
  PageResult,
} from '../../../shared/service/abstract-provider';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { SegmentSearchRequest } from '../dto/segment.search-request';
import { SegmentEntity } from '../entity/segment.entity';

@Injectable()
export class SegmentProvider extends AbstractProvider<SegmentEntity> {
  constructor(
    @InjectRepository(SegmentEntity)
    repository: Repository<SegmentEntity>,
  ) {
    super(repository);
  }

  findAll(search: SegmentSearchRequest): Promise<PageResult<SegmentEntity>> {
    const where: FindOptionsWhere<SegmentEntity> = {};

    if (search.name) {
      where.name = search.name;
    }

    return this.findPage({
      page: search.page,
      limit: search.limit,
      where,
      order: this.resolveOrder(search.sort, search.order),
    });
  }

  private resolveOrder(
    sort?: string,
    order?: 'ASC' | 'DESC',
  ): FindOptionsOrder<SegmentEntity> {
    const direction = order ?? 'ASC';

    if (sort === 'name') {
      return { name: direction };
    }

    return { name: direction };
  }
}
