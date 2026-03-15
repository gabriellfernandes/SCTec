import { Body, Controller, Post } from '@nestjs/common';
import { ContactEmailDto } from '../dto/contact-email.dto';
import { ContactEmailRequest } from '../dto/contact-email.request';
import { ContactEmailRequestManager } from '../service/request-manager';
import { ContactEmailResponseMapper } from '../service/response-mapper';

@Controller('contact-emails')
export class ContactEmailCreateController {
  constructor(
    private readonly requestManager: ContactEmailRequestManager,
    private readonly responseMapper: ContactEmailResponseMapper,
  ) {}

  @Post()
  async create(@Body() request: ContactEmailRequest): Promise<ContactEmailDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
