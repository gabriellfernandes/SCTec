import { Controller, Delete, Param } from '@nestjs/common';
import { ContactEmailRequestManager } from '../service/request-manager';

@Controller('contact-emails')
export class ContactEmailDeleteController {
  constructor(private readonly requestManager: ContactEmailRequestManager) {}

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
