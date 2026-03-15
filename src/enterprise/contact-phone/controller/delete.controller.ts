import { Controller, Delete, Param } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import { ContactPhoneRequestManager } from '../service/request-manager';

@Controller('contact-phones')
export class ContactPhoneDeleteController {
  constructor(private readonly requestManager: ContactPhoneRequestManager) {}

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
