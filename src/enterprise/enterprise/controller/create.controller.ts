import { Body, Controller, Post } from '@nestjs/common';
import { EnterpriseDto } from '../dto/enterprise.dto';
import { EnterpriseRequest } from '../dto/enterprise.request';
import { EnterpriseRequestManager } from '../service/request-manager';
import { EnterpriseResponseMapper } from '../service/response-mapper';

@Controller('enterprises')
export class EnterpriseCreateController {
  constructor(
    private readonly requestManager: EnterpriseRequestManager,
    private readonly responseMapper: EnterpriseResponseMapper,
  ) {}

  @Post()
  async create(@Body() request: EnterpriseRequest): Promise<EnterpriseDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
