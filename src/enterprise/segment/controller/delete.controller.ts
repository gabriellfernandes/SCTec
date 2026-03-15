import { Controller, Delete, Param } from '@nestjs/common';
import { SegmentRequestManager } from '../service/request-manager';

@Controller('segments')
export class SegmentDeleteController {
  constructor(private readonly requestManager: SegmentRequestManager) {}

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
