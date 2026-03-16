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
  IsNull,
  Repository,
} from 'typeorm';
import { ContactEmailSearchRequest } from '../dto/contact-email.search-request';
import { EmailEntity } from '../entity/email.entity';

@Injectable()
export class ContactEmailProvider extends AbstractProvider<EmailEntity> {
  constructor(
    @InjectRepository(EmailEntity)
    repository: Repository<EmailEntity>,
  ) {
    super(repository);
  }

  findByIdOrNull(id: string): Promise<EmailEntity | null> {
    return this.findOne({
      where: {
        id,
        contact: { deletedAt: IsNull() },
      },
      relations: this.defaultRelations(),
    });
  }

  findAll(search: ContactEmailSearchRequest): Promise<PageResult<EmailEntity>> {
    const where: FindOptionsWhere<EmailEntity> = {
      contact: {
        ...(search.contactId ? { id: search.contactId } : {}),
        deletedAt: IsNull(),
      },
    };

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
  ): FindOptionsOrder<EmailEntity> {
    const direction = order ?? 'ASC';

    if (sort === 'address') {
      return { address: direction };
    }

    return { address: direction };
  }

  private defaultRelations(): FindOptionsRelations<EmailEntity> {
    return {
      contact: true,
    };
  }
}
