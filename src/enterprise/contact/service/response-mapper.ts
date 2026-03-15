import { Injectable } from '@nestjs/common';
import { ContactDto } from '../dto/contact.dto';
import { ContactEntity } from '../entity/contact.entity';

@Injectable()
export class ContactResponseMapper {
  mapMultiple(entities: ContactEntity[]): Promise<ContactDto[]> {
    return Promise.resolve(entities.map((entity) => this.map(entity)));
  }

  map(entity: ContactEntity): ContactDto {
    const dto = new ContactDto();
    dto.id = entity.id;
    dto.enterpriseId = entity.enterprise.id;
    return dto;
  }
}
