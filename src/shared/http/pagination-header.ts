import type { Response } from 'express';
import { PageResult } from '../service/abstract-provider';

export function setPaginationHeaders<T>(
  response: Response,
  pageResult: PageResult<T>,
): void {
  response.setHeader('x-total', String(pageResult.total));
  response.setHeader('x-page', String(pageResult.page));
  response.setHeader('x-limit', String(pageResult.limit));
  response.setHeader('x-total-pages', String(pageResult.totalPages));
}
