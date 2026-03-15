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
import { ContactPhoneSearchRequest } from '../dto/contact-phone.search-request';
import { PhoneEntity } from '../entity/phone.entity';

@Injectable()
export class ContactPhoneProvider extends AbstractProvider<PhoneEntity> {
  constructor(
    @InjectRepository(PhoneEntity)
    repository: Repository<PhoneEntity>,
  ) {
    super(repository);
  }

  findByIdOrNull(id: string): Promise<PhoneEntity | null> {
    return this.findOne({
      where: { id },
      relations: this.defaultRelations(),
    });
  }

  findAll(search: ContactPhoneSearchRequest): Promise<PageResult<PhoneEntity>> {
    const where: FindOptionsWhere<PhoneEntity> = {};

    if (search.contactId) {
      where.contact = { id: search.contactId };
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
  ): FindOptionsOrder<PhoneEntity> {
    const direction = order ?? 'ASC';

    if (sort === 'number') {
      return { number: direction };
    }

    return { number: direction };
  }

  private defaultRelations(): FindOptionsRelations<PhoneEntity> {
    return {
      contact: true,
    };
  }
}
