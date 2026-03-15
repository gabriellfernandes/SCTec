import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { setPaginationHeaders } from '../../../shared/http/pagination-header';
import { SegmentDto } from '../dto/segment.dto';
import { SegmentSearchRequest } from '../dto/segment.search-request';
import { SegmentProvider } from '../service/provider';
import { SegmentResponseMapper } from '../service/response-mapper';

@Controller('segments')
export class SegmentReadController {
  constructor(
    private readonly provider: SegmentProvider,
    private readonly responseMapper: SegmentResponseMapper,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SegmentDto> {
    const entity = await this.provider.findById(id, 'Segment not found');
    return this.responseMapper.map(entity);
  }

  @Get()
  async findAll(
    @Query() search: SegmentSearchRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SegmentDto[]> {
    const result = await this.provider.findAll(search);
    setPaginationHeaders(response, result);
    return this.responseMapper.mapMultiple(result.items);
  }
}
