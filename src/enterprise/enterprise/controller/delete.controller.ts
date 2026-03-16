import { Controller, Delete, Param } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import { EnterpriseRequestManager } from '../service/request-manager';

@Controller('enterprises')
export class EnterpriseDeleteController {
  constructor(private readonly requestManager: EnterpriseRequestManager) {}

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
