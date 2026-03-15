import { IsIn, IsOptional, IsUUID } from 'class-validator';
import { BaseSearchRequest } from '../../../shared/dto/base-search.request';

const CONTACT_PHONE_SORT_FIELDS = ['number'] as const;

export class ContactPhoneSearchRequest extends BaseSearchRequest {
  @IsOptional()
  @IsUUID()
  contactId?: string;

  @IsOptional()
  @IsIn(CONTACT_PHONE_SORT_FIELDS)
  declare sort?: (typeof CONTACT_PHONE_SORT_FIELDS)[number];
}
