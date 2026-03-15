import { Injectable } from '@nestjs/common';
import { ContactEntity } from '../../contact/entity/contact.entity';
import { ContactEmailRequest } from '../dto/contact-email.request';
import { EmailEntity } from '../entity/email.entity';
import { ContactEmailManager } from './manager';
import { ContactEmailProvider } from './provider';

@Injectable()
export class ContactEmailRequestManager {
  constructor(
    private readonly manager: ContactEmailManager,
    private readonly provider: ContactEmailProvider,
  ) {}

  create(request: ContactEmailRequest): Promise<EmailEntity> {
    const entity = new EmailEntity();
    this.mapRequestData(entity, request);
    return this.manager.create(entity);
  }

  async update(id: string, request: ContactEmailRequest): Promise<EmailEntity> {
    const entity = await this.provider.findById(id, 'Contact email not found');
    this.mapRequestData(entity, request);
    return this.manager.update(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.provider.findById(id, 'Contact email not found');
    await this.manager.delete(entity);
  }

  mapRequestData(entity: EmailEntity, request: ContactEmailRequest): void {
    entity.address = request.address;
    entity.contact = { id: request.contactId } as ContactEntity;
  }
}
