import { Controller, Delete, Param } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import { SegmentRequestManager } from '../service/request-manager';

@Controller('segments')
export class SegmentDeleteController {
  constructor(private readonly requestManager: SegmentRequestManager) {}

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
