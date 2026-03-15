import { Injectable } from '@nestjs/common';
import { ContactEntity } from '../../contact/entity/contact.entity';
import { ContactPhoneRequest } from '../dto/contact-phone.request';
import { PhoneEntity } from '../entity/phone.entity';
import { ContactPhoneManager } from './manager';
import { ContactPhoneProvider } from './provider';

@Injectable()
export class ContactPhoneRequestManager {
  constructor(
    private readonly manager: ContactPhoneManager,
    private readonly provider: ContactPhoneProvider,
  ) {}

  create(request: ContactPhoneRequest): Promise<PhoneEntity> {
    const entity = new PhoneEntity();
    this.mapRequestData(entity, request);
    return this.manager.create(entity);
  }

  async update(id: string, request: ContactPhoneRequest): Promise<PhoneEntity> {
    const entity = await this.provider.findById(id, 'Contact phone not found');
    this.mapRequestData(entity, request);
    return this.manager.update(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.provider.findById(id, 'Contact phone not found');
    await this.manager.delete(entity);
  }

  mapRequestData(entity: PhoneEntity, request: ContactPhoneRequest): void {
    entity.number = request.number;
    entity.contact = { id: request.contactId } as ContactEntity;
  }
}
