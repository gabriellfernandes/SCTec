import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserRequest } from '../dto/user.request';
import { UserRequestManager } from '../service/request-manager';
import { UserResponseMapper } from '../service/response-mapper';

@Controller('users')
export class UserUpdateController {
  constructor(
    private readonly requestManager: UserRequestManager,
    private readonly responseMapper: UserResponseMapper,
  ) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: UserRequest,
  ): Promise<UserDto> {
    const entity = await this.requestManager.update(id, request);
    return this.responseMapper.map(entity);
  }
}
