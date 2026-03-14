import { Controller, Delete, Param } from '@nestjs/common';
import { EnterpriseRequestManager } from '../service/request-manager';

@Controller('enterprises')
export class EnterpriseDeleteController {
  constructor(private readonly requestManager: EnterpriseRequestManager) {}

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
