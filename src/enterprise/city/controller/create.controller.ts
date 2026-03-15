import { Body, Controller, Post } from '@nestjs/common';
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

  @Post()
  async create(@Body() request: CityRequest): Promise<CityDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
