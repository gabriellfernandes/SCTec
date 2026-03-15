import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import type { Response } from 'express';
import { setPaginationHeaders } from '../../../shared/http/pagination-header';
import { EnterpriseDto } from '../dto/enterprise.dto';
import { EnterpriseSearchRequest } from '../dto/enterprise.search-request';
import { EnterpriseProvider } from '../service/provider';
import { EnterpriseResponseMapper } from '../service/response-mapper';

@Controller('enterprises')
export class EnterpriseReadController {
  constructor(
    private readonly provider: EnterpriseProvider,
    private readonly responseMapper: EnterpriseResponseMapper,
  ) {}

  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<EnterpriseDto> {
    const entity = await this.provider.findById(id);
    return this.responseMapper.map(entity);
  }

  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  @Get()
  async findAll(
    @Query() search: EnterpriseSearchRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<EnterpriseDto[]> {
    const result = await this.provider.findAll(search);
    setPaginationHeaders(response, result);

    return this.responseMapper.mapMultiple(result.items);
  }
}
