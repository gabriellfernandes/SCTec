import { Body, Controller, Param, Patch } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import { CityDto } from '../dto/city.dto';
import { CityRequest } from '../dto/city.request';
import { CityRequestManager } from '../service/request-manager';
import { CityResponseMapper } from '../service/response-mapper';

@Controller('cities')
export class CityUpdateController {
  constructor(
    private readonly requestManager: CityRequestManager,
    private readonly responseMapper: CityResponseMapper,
  ) {}

  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: CityRequest,
  ): Promise<CityDto> {
    const entity = await this.requestManager.update(id, request);
    return this.responseMapper.map(entity);
  }
}
