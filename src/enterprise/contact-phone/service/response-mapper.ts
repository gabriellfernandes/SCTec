import { Injectable } from '@nestjs/common';
import { ContactPhoneDto } from '../dto/contact-phone.dto';
import { PhoneEntity } from '../entity/phone.entity';

@Injectable()
export class ContactPhoneResponseMapper {
  mapMultiple(entities: PhoneEntity[]): Promise<ContactPhoneDto[]> {
    return Promise.resolve(entities.map((entity) => this.map(entity)));
  }

  map(entity: PhoneEntity): ContactPhoneDto {
    const dto = new ContactPhoneDto();
    dto.id = entity.id;
    dto.contactId = entity.contact.id;
    dto.number = entity.number;
    return dto;
  }
}
