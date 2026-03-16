import { Controller, Delete, Param } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import { ContactEmailRequestManager } from '../service/request-manager';

@Controller('contact-emails')
export class ContactEmailDeleteController {
  constructor(private readonly requestManager: ContactEmailRequestManager) {}

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
