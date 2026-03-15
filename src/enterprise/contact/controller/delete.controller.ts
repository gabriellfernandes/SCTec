import { Controller, Delete, Param } from '@nestjs/common';
import { ContactRequestManager } from '../service/request-manager';

@Controller('contacts')
export class ContactDeleteController {
  constructor(private readonly requestManager: ContactRequestManager) {}

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
