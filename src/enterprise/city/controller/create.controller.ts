import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import { CityDto } from '../dto/city.dto';
import { CityRequest } from '../dto/city.request';
import { CityRequestManager } from '../service/request-manager';
import { CityResponseMapper } from '../service/response-mapper';

@Controller('cities')
export class CityCreateController {
  constructor(
    private readonly requestManager: CityRequestManager,
    private readonly responseMapper: CityResponseMapper,
  ) {}

  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @Post()
  async create(@Body() request: CityRequest): Promise<CityDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
