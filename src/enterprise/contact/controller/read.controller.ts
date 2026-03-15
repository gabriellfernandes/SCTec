import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import type { Response } from 'express';
import { setPaginationHeaders } from '../../../shared/http/pagination-header';
import { ContactDto } from '../dto/contact.dto';
import { ContactSearchRequest } from '../dto/contact.search-request';
import { ContactProvider } from '../service/provider';
import { ContactResponseMapper } from '../service/response-mapper';

@Controller('contacts')
export class ContactReadController {
  constructor(
    private readonly provider: ContactProvider,
    private readonly responseMapper: ContactResponseMapper,
  ) {}

  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ContactDto> {
    const entity = await this.provider.findById(id, 'Contact not found');
    return this.responseMapper.map(entity);
  }

  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  @Get()
  async findAll(
    @Query() search: ContactSearchRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ContactDto[]> {
    const result = await this.provider.findAll(search);
    setPaginationHeaders(response, result);
    return this.responseMapper.mapMultiple(result.items);
  }
}
