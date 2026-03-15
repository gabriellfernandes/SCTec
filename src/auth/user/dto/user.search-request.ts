import { IsEnum, IsOptional } from 'class-validator';
import { BaseSearchRequest } from '../../../shared/dto/base-search.request';
import { UserRole } from '../entity/user.entity';

export class UserSearchRequest extends BaseSearchRequest {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
