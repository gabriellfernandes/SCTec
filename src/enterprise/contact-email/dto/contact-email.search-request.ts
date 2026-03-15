import { IsIn, IsOptional, IsUUID } from 'class-validator';
import { BaseSearchRequest } from '../../../shared/dto/base-search.request';

const CONTACT_EMAIL_SORT_FIELDS = ['address'] as const;

export class ContactEmailSearchRequest extends BaseSearchRequest {
  @IsOptional()
  @IsUUID()
  contactId?: string;

  @IsOptional()
  @IsIn(CONTACT_EMAIL_SORT_FIELDS)
  declare sort?: (typeof CONTACT_EMAIL_SORT_FIELDS)[number];
}
