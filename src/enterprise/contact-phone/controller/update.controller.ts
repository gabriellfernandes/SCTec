import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ContactPhoneDto } from '../dto/contact-phone.dto';
import { ContactPhoneRequest } from '../dto/contact-phone.request';
import { ContactPhoneRequestManager } from '../service/request-manager';
import { ContactPhoneResponseMapper } from '../service/response-mapper';

@Controller('contact-phones')
export class ContactPhoneUpdateController {
  constructor(
    private readonly requestManager: ContactPhoneRequestManager,
    private readonly responseMapper: ContactPhoneResponseMapper,
  ) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: ContactPhoneRequest,
  ): Promise<ContactPhoneDto> {
    const entity = await this.requestManager.update(id, request);
    return this.responseMapper.map(entity);
  }
}
