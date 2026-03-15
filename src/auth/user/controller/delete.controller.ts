import { Controller, Delete, Param } from '@nestjs/common';
import { UserRequestManager } from '../service/request-manager';

@Controller('users')
export class UserDeleteController {
  constructor(private readonly requestManager: UserRequestManager) {}

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestManager.delete(id);
  }
}
