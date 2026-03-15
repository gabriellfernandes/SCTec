import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
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

  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @Post()
  async create(@Body() request: SegmentRequest): Promise<SegmentDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
