import { Body, Controller, Param, Patch } from '@nestjs/common';
import { EnterpriseDto } from '../dto/enterprise.dto';
import { EnterpriseRequest } from '../dto/enterprise.request';
import { EnterpriseRequestManager } from '../service/request-manager';
import { EnterpriseResponseMapper } from '../service/response-mapper';

@Controller('enterprises')
export class EnterpriseUpdateController {
  constructor(
    private readonly requestManager: EnterpriseRequestManager,
    private readonly responseMapper: EnterpriseResponseMapper,
  ) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: EnterpriseRequest,
  ): Promise<EnterpriseDto> {
    const entity = await this.requestManager.update(id, request);
    return this.responseMapper.map(entity);
  }
}
