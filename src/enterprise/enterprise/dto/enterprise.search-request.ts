import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseSearchRequest } from '../../../shared/dto/base-search.request';

const ENTERPRISE_SORT_FIELDS = [
  'name',
  'ownerName',
  'active',
  'cityName',
  'segmentName',
] as const;

export class EnterpriseSearchRequest extends BaseSearchRequest {
  @IsOptional()
  @IsUUID()
  cityId?: string;

  @IsOptional()
  @IsUUID()
  segmentId?: string;

  @IsOptional()
  @IsString()
  @IsIn(ENTERPRISE_SORT_FIELDS)
  declare sort?: string;
}
