import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import type { Response } from 'express';
import { setPaginationHeaders } from '../../../shared/http/pagination-header';
import { ContactEmailDto } from '../dto/contact-email.dto';
import { ContactEmailSearchRequest } from '../dto/contact-email.search-request';
import { ContactEmailProvider } from '../service/provider';
import { ContactEmailResponseMapper } from '../service/response-mapper';

@Controller('contact-emails')
export class ContactEmailReadController {
  constructor(
    private readonly provider: ContactEmailProvider,
    private readonly responseMapper: ContactEmailResponseMapper,
  ) {}

  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ContactEmailDto> {
    const entity = await this.provider.findById(id, 'Contact email not found');
    return this.responseMapper.map(entity);
  }

  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  @Get()
  async findAll(
    @Query() search: ContactEmailSearchRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ContactEmailDto[]> {
    const result = await this.provider.findAll(search);
    setPaginationHeaders(response, result);
    return this.responseMapper.mapMultiple(result.items);
  }
}
