import { Body, Controller, Param, Patch } from '@nestjs/common';
import { Roles } from '../../../auth/auth/decorator/roles.decorator';
import { UserRole } from '../../../auth/user/entity/user.entity';
import { ContactDto } from '../dto/contact.dto';
import { ContactRequest } from '../dto/contact.request';
import { ContactRequestManager } from '../service/request-manager';
import { ContactResponseMapper } from '../service/response-mapper';

@Controller('contacts')
export class ContactUpdateController {
  constructor(
    private readonly requestManager: ContactRequestManager,
    private readonly responseMapper: ContactResponseMapper,
  ) {}

  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: ContactRequest,
  ): Promise<ContactDto> {
    const entity = await this.requestManager.update(id, request);
    return this.responseMapper.map(entity);
  }
}
