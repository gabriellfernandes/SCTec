import { IsIn, IsOptional, IsString } from 'class-validator';
import { BaseSearchRequest } from '../../../shared/dto/base-search.request';

const ENTERPRISE_SORT_FIELDS = [
  'name',
  'ownerName',
  'city',
  'segment',
] as const;

export class EnterpriseSearchRequest extends BaseSearchRequest {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Technology', 'Commerce', 'Industry', 'Services', 'Agribusiness'])
  segment?: string;

  @IsOptional()
  @IsString()
  @IsIn(ENTERPRISE_SORT_FIELDS)
  declare sort?: string;
}
