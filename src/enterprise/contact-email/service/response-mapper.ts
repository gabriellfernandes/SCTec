import { Injectable } from '@nestjs/common';
import { ContactEmailDto } from '../dto/contact-email.dto';
import { EmailEntity } from '../entity/email.entity';

@Injectable()
export class ContactEmailResponseMapper {
  mapMultiple(entities: EmailEntity[]): Promise<ContactEmailDto[]> {
    return Promise.resolve(entities.map((entity) => this.map(entity)));
  }

  map(entity: EmailEntity): ContactEmailDto {
    const dto = new ContactEmailDto();
    dto.id = entity.id;
    dto.contactId = entity.contact.id;
    dto.address = entity.address;
    return dto;
  }
}
