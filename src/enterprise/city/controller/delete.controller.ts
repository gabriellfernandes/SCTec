import { Controller, Delete, Param } from '@nestjs/common';
import { CityRequestManager } from '../service/request-manager';

@Controller('cities')
export class CityDeleteController {
  constructor(private readonly requestManager: CityRequestManager) {}

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
