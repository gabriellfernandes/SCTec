import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { setPaginationHeaders } from '../../../shared/http/pagination-header';
import { ContactPhoneDto } from '../dto/contact-phone.dto';
import { ContactPhoneSearchRequest } from '../dto/contact-phone.search-request';
import { ContactPhoneProvider } from '../service/provider';
import { ContactPhoneResponseMapper } from '../service/response-mapper';

@Controller('contact-phones')
export class ContactPhoneReadController {
  constructor(
    private readonly provider: ContactPhoneProvider,
    private readonly responseMapper: ContactPhoneResponseMapper,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ContactPhoneDto> {
    const entity = await this.provider.findById(id, 'Contact phone not found');
    return this.responseMapper.map(entity);
  }

  @Get()
  async findAll(
    @Query() search: ContactPhoneSearchRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ContactPhoneDto[]> {
    const result = await this.provider.findAll(search);
    setPaginationHeaders(response, result);
    return this.responseMapper.mapMultiple(result.items);
  }
}
