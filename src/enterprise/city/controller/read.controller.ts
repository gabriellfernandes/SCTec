import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { setPaginationHeaders } from '../../../shared/http/pagination-header';
import { CityDto } from '../dto/city.dto';
import { CitySearchRequest } from '../dto/city.search-request';
import { CityProvider } from '../service/provider';
import { CityResponseMapper } from '../service/response-mapper';

@Controller('cities')
export class CityReadController {
  constructor(
    private readonly provider: CityProvider,
    private readonly responseMapper: CityResponseMapper,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CityDto> {
    const entity = await this.provider.findById(id, 'City not found');
    return this.responseMapper.map(entity);
  }

  @Get()
  async findAll(
    @Query() search: CitySearchRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<CityDto[]> {
    const result = await this.provider.findAll(search);
    setPaginationHeaders(response, result);
    return this.responseMapper.mapMultiple(result.items);
  }
}
