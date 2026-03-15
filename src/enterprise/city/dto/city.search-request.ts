import { IsIn, IsOptional, IsString } from 'class-validator';
import { BaseSearchRequest } from '../../../shared/dto/base-search.request';

const CITY_SORT_FIELDS = ['name'] as const;

export class CitySearchRequest extends BaseSearchRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsIn(CITY_SORT_FIELDS)
  declare sort?: (typeof CITY_SORT_FIELDS)[number];
}
