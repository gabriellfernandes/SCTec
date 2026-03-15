import { Injectable } from '@nestjs/common';
import { EnterpriseRequest } from '../dto/enterprise.request';
import { CityEntity } from '../../city/entity/city.entity';
import { ContactEntity } from '../../contact/entity/contact.entity';
import { EmailEntity } from '../../contact-email/entity/email.entity';
import { EnterpriseEntity } from '../entity/enterprise.entity';
import { PhoneEntity } from '../../contact-phone/entity/phone.entity';
import { SegmentEntity } from '../../segment/entity/segment.entity';
import { EnterpriseManager } from './manager';
import { EnterpriseProvider } from './provider';

@Injectable()
export class EnterpriseRequestManager {
  constructor(
    private readonly manager: EnterpriseManager,
    private readonly provider: EnterpriseProvider,
  ) {}

  create(request: EnterpriseRequest): Promise<EnterpriseEntity> {
    const entity = new EnterpriseEntity();
    this.mapRequestData(entity, request);
    return this.manager.create(entity);
  }

  async update(
    id: string,
    request: EnterpriseRequest,
  ): Promise<EnterpriseEntity> {
    const entity = await this.provider.findById(id, 'Enterprise not found');
    this.mapRequestData(entity, request);
    return this.manager.update(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.provider.findById(id, 'Enterprise not found');
    await this.manager.delete(entity);
  }

  mapRequestData(entity: EnterpriseEntity, request: EnterpriseRequest): void {
    entity.name = request.name;
    entity.ownerName = request.ownerName;
    entity.city = { id: request.cityId } as CityEntity;
    entity.segment = { id: request.segmentId } as SegmentEntity;
    entity.contacts = request.contacts.map((contactRequest) => {
      const contact = new ContactEntity();
      contact.enterprise = entity;
      contact.emails = (contactRequest.emails ?? []).map((address) => {
        const email = new EmailEntity();
        email.address = address;
        return email;
      });
      contact.phones = (contactRequest.phones ?? []).map((number) => {
        const phone = new PhoneEntity();
        phone.number = number;
        return phone;
      });
      return contact;
    });
    entity.active = request.active;
  }
}
