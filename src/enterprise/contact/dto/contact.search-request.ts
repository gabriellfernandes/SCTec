import { IsIn, IsOptional, IsUUID } from 'class-validator';
import { BaseSearchRequest } from '../../../shared/dto/base-search.request';

const CONTACT_SORT_FIELDS = ['id'] as const;

export class ContactSearchRequest extends BaseSearchRequest {
  @IsOptional()
  @IsUUID()
  enterpriseId?: string;

  @IsOptional()
  @IsIn(CONTACT_SORT_FIELDS)
  declare sort?: (typeof CONTACT_SORT_FIELDS)[number];
}
