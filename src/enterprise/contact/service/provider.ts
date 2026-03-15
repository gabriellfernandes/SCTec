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
import { ContactSearchRequest } from '../dto/contact.search-request';
import { ContactEntity } from '../entity/contact.entity';

@Injectable()
export class ContactProvider extends AbstractProvider<ContactEntity> {
  constructor(
    @InjectRepository(ContactEntity)
    repository: Repository<ContactEntity>,
  ) {
    super(repository);
  }

  findByIdOrNull(id: string): Promise<ContactEntity | null> {
    return this.findOne({
      where: { id },
      relations: this.defaultRelations(),
    });
  }

  findAll(search: ContactSearchRequest): Promise<PageResult<ContactEntity>> {
    const where: FindOptionsWhere<ContactEntity> = {};

    if (search.enterpriseId) {
      where.enterprise = { id: search.enterpriseId };
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
  ): FindOptionsOrder<ContactEntity> {
    const direction = order ?? 'ASC';

    if (sort === 'id') {
      return { id: direction };
    }

    return { id: direction };
  }

  private defaultRelations(): FindOptionsRelations<ContactEntity> {
    return {
      enterprise: true,
      emails: true,
      phones: true,
    };
  }
}
