import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
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

  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @Post()
  async create(@Body() request: ContactPhoneRequest): Promise<ContactPhoneDto> {
    const entity = await this.requestManager.create(request);
    return this.responseMapper.map(entity);
  }
}
