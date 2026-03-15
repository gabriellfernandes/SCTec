import { Injectable } from '@nestjs/common';
import { CityDto } from '../../city/dto/city.dto';
import { ContactDto } from '../../contact/dto/contact.dto';
import { ContactEmailDto } from '../../contact-email/dto/contact-email.dto';
import { ContactPhoneDto } from '../../contact-phone/dto/contact-phone.dto';
import { SegmentDto } from '../../segment/dto/segment.dto';
import { EnterpriseDto } from '../dto/enterprise.dto';
import { EnterpriseEntity } from '../entity/enterprise.entity';

@Injectable()
export class EnterpriseResponseMapper {
  mapMultiple(entities: EnterpriseEntity[]): Promise<EnterpriseDto[]> {
    return Promise.resolve(entities.map((entity) => this.map(entity)));
  }

  map(entity: EnterpriseEntity): EnterpriseDto {
    const dto = new EnterpriseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.ownerName = entity.ownerName;
    dto.active = entity.active;

    const city = new CityDto();
    city.id = entity.city?.id ?? '';
    city.name = entity.city?.name ?? '';
    dto.city = city;

    const segment = new SegmentDto();
    segment.id = entity.segment?.id ?? '';
    segment.name = entity.segment?.name ?? '';
    dto.segment = segment;

    dto.contacts = (entity.contacts ?? []).map((contact) => {
      const contactDto = new ContactDto();
      contactDto.id = contact.id;
      contactDto.enterpriseId = contact.enterprise?.id ?? entity.id;
      contactDto.name = contact.name ?? null;
      contactDto.department = contact.department ?? null;
      contactDto.emails = (contact.emails ?? []).map((email) => {
        const emailDto = new ContactEmailDto();
        emailDto.id = email.id;
        emailDto.contactId = email.contact?.id ?? contact.id;
        emailDto.address = email.address;
        return emailDto;
      });
      contactDto.phones = (contact.phones ?? []).map((phone) => {
        const phoneDto = new ContactPhoneDto();
        phoneDto.id = phone.id;
        phoneDto.contactId = phone.contact?.id ?? contact.id;
        phoneDto.number = phone.number;
        return phoneDto;
      });
      return contactDto;
    });
    return dto;
  }
}
