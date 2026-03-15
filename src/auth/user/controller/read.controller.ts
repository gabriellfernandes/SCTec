import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { setPaginationHeaders } from '../../../shared/http/pagination-header';
import { UserDto } from '../dto/user.dto';
import { UserSearchRequest } from '../dto/user.search-request';
import { UserProvider } from '../service/provider';
import { UserResponseMapper } from '../service/response-mapper';

@Controller('users')
export class UserReadController {
  constructor(
    private readonly provider: UserProvider,
    private readonly responseMapper: UserResponseMapper,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDto> {
    const entity = await this.provider.findById(id, 'User not found');
    return this.responseMapper.map(entity);
  }

  @Get()
  async findAll(
    @Query() search: UserSearchRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserDto[]> {
    const result = await this.provider.findAll(search);
    setPaginationHeaders(response, result);
    return this.responseMapper.mapMultiple(result.items);
  }
}
