import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ContactEmailDto } from '../dto/contact-email.dto';
import { ContactEmailRequest } from '../dto/contact-email.request';
import { ContactEmailRequestManager } from '../service/request-manager';
import { ContactEmailResponseMapper } from '../service/response-mapper';

@Controller('contact-emails')
export class ContactEmailUpdateController {
  constructor(
    private readonly requestManager: ContactEmailRequestManager,
    private readonly responseMapper: ContactEmailResponseMapper,
  ) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: ContactEmailRequest,
  ): Promise<ContactEmailDto> {
    const entity = await this.requestManager.update(id, request);
    return this.responseMapper.map(entity);
  }
}
