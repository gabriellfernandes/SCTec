import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserRequest } from '../dto/user.request';
import { UserRequestManager } from '../service/request-manager';
import { UserResponseMapper } from '../service/response-mapper';

@Controller('users')
export class UserCreateController {
  constructor(
    private readonly requestManager: UserRequestManager,
    private readonly responseMapper: UserResponseMapper,
  ) {}

  @Post()
  async create(@Body() request: UserRequest): Promise<UserDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
