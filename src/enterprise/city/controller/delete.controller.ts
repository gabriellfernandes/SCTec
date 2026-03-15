import { Controller, Delete, Param } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import { CityRequestManager } from '../service/request-manager';

@Controller('cities')
export class CityDeleteController {
  constructor(private readonly requestManager: CityRequestManager) {}

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
