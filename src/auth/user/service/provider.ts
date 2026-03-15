import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractProvider,
  PageResult,
} from '../../../shared/service/abstract-provider';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserSearchRequest } from '../dto/user.search-request';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserProvider extends AbstractProvider<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  findAll(search: UserSearchRequest): Promise<PageResult<UserEntity>> {
    const where: FindOptionsWhere<UserEntity> = {};

    if (search.role) {
      where.role = search.role;
    }

    return this.findPage({
      page: search.page,
      limit: search.limit,
      where,
      order: { name: search.order ?? 'ASC' },
    });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.findOne({ where: { email } });
  }
}
