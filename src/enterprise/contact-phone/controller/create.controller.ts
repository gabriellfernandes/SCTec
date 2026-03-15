import { Body, Controller, Post } from '@nestjs/common';
import { ContactPhoneDto } from '../dto/contact-phone.dto';
import { ContactPhoneRequest } from '../dto/contact-phone.request';
import { ContactPhoneRequestManager } from '../service/request-manager';
import { ContactPhoneResponseMapper } from '../service/response-mapper';

@Controller('contact-phones')
export class ContactPhoneCreateController {
  constructor(
    private readonly requestManager: ContactPhoneRequestManager,
    private readonly responseMapper: ContactPhoneResponseMapper,
  ) {}

  @Post()
  async create(@Body() request: ContactPhoneRequest): Promise<ContactPhoneDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
