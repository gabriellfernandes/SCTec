import { Body, Controller, Param, Patch } from '@nestjs/common';
import { SegmentDto } from '../dto/segment.dto';
import { SegmentRequest } from '../dto/segment.request';
import { SegmentRequestManager } from '../service/request-manager';
import { SegmentResponseMapper } from '../service/response-mapper';

@Controller('segments')
export class SegmentUpdateController {
  constructor(
    private readonly requestManager: SegmentRequestManager,
    private readonly responseMapper: SegmentResponseMapper,
  ) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: SegmentRequest,
  ): Promise<SegmentDto> {
    const entity = await this.requestManager.update(id, request);
    return this.responseMapper.map(entity);
  }
}
