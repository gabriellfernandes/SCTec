import { Controller, Delete, Param } from '@nestjs/common';
import { Roles } from '../../auth/decorator/roles.decorator';
import { UserRole } from '../entity/user.entity';
import { UserRequestManager } from '../service/request-manager';

@Controller('users')
export class UserDeleteController {
  constructor(private readonly requestManager: UserRequestManager) {}

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
