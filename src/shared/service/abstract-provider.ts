import { NotFoundException } from '@nestjs/common';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export type PageResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export abstract class AbstractProvider<
  T extends ObjectLiteral & { id: string },
> {
  protected constructor(protected readonly repository: Repository<T>) {}

  find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]> {
    return this.repository.findBy(where);
  }

  async findPage(options: {
    page?: number;
    limit?: number;
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
    order?: FindOptionsOrder<T>;
    relations?: FindOptionsRelations<T>;
  }): Promise<PageResult<T>> {
    const page = this.resolvePage(options.page);
    const limit = this.resolveLimit(options.limit);
    const [items, total] = await this.repository.findAndCount({
      where: options.where,
      order: options.order,
      relations: options.relations,
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  findByIdOrNull(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as FindOptionsWhere<T> });
  }

  async findById(id: string, message = 'Resource not found'): Promise<T> {
    const entity = await this.findByIdOrNull(id);

    if (!entity) {
      throw new NotFoundException(message);
    }

    return entity;
  }

  mapSearchQuery<K extends keyof T>(
    search: Partial<Record<K, unknown>>,
    keys: K[],
  ): FindOptionsWhere<T> {
    const where = {} as FindOptionsWhere<T>;

    for (const key of keys) {
      const value = search[key];

      if (value !== undefined && value !== null && value !== '') {
        where[key] = value as T[K];
      }
    }

    return where;
  }

  private resolvePage(page?: number): number {
    if (!page || page < 1) {
      return 1;
    }

    return page;
  }

  private resolveLimit(limit?: number): number {
    if (!limit || limit < 1) {
      return 10;
    }

    if (limit > 100) {
      return 100;
    }

    return limit;
  }
}
