import { Body, Controller, Post } from '@nestjs/common';
import { ContactDto } from '../dto/contact.dto';
import { ContactRequest } from '../dto/contact.request';
import { ContactRequestManager } from '../service/request-manager';
import { ContactResponseMapper } from '../service/response-mapper';

@Controller('contacts')
export class ContactCreateController {
  constructor(
    private readonly requestManager: ContactRequestManager,
    private readonly responseMapper: ContactResponseMapper,
  ) {}

  @Post()
  async create(@Body() request: ContactRequest): Promise<ContactDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
