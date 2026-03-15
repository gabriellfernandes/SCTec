import { Controller, Delete, Param } from '@nestjs/common';
import { ContactPhoneRequestManager } from '../service/request-manager';

@Controller('contact-phones')
export class ContactPhoneDeleteController {
  constructor(private readonly requestManager: ContactPhoneRequestManager) {}

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
