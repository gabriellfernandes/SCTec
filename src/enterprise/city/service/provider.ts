import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractProvider,
  PageResult,
} from '../../../shared/service/abstract-provider';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { CitySearchRequest } from '../dto/city.search-request';
import { CityEntity } from '../entity/city.entity';

@Injectable()
export class CityProvider extends AbstractProvider<CityEntity> {
  constructor(
    @InjectRepository(CityEntity)
    repository: Repository<CityEntity>,
  ) {
    super(repository);
  }

  findAll(search: CitySearchRequest): Promise<PageResult<CityEntity>> {
    const where: FindOptionsWhere<CityEntity> = {};

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
  ): FindOptionsOrder<CityEntity> {
    const direction = order ?? 'ASC';

    if (sort === 'name') {
      return { name: direction };
    }

    return { name: direction };
  }
}
