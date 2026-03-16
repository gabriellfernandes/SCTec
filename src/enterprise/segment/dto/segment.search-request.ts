import { IsIn, IsOptional, IsString } from 'class-validator';
import { BaseSearchRequest } from '../../../shared/dto/base-search.request';

const SEGMENT_SORT_FIELDS = ['name', 'createdAt', 'updatedAt'] as const;

export class SegmentSearchRequest extends BaseSearchRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsIn(SEGMENT_SORT_FIELDS)
  declare sort?: (typeof SEGMENT_SORT_FIELDS)[number];
}
