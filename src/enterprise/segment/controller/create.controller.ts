import { Body, Controller, Post } from '@nestjs/common';
import { SegmentDto } from '../dto/segment.dto';
import { SegmentRequest } from '../dto/segment.request';
import { SegmentRequestManager } from '../service/request-manager';
import { SegmentResponseMapper } from '../service/response-mapper';

@Controller('segments')
export class SegmentCreateController {
  constructor(
    private readonly requestManager: SegmentRequestManager,
    private readonly responseMapper: SegmentResponseMapper,
  ) {}

  @Post()
  async create(@Body() request: SegmentRequest): Promise<SegmentDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
