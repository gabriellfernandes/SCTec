import { Injectable } from '@nestjs/common';
import { ContactRequest } from '../dto/contact.request';
import { ContactEntity } from '../entity/contact.entity';
import { EnterpriseEntity } from '../../enterprise/entity/enterprise.entity';
import { ContactManager } from './manager';
import { ContactProvider } from './provider';

@Injectable()
export class ContactRequestManager {
  constructor(
    private readonly manager: ContactManager,
    private readonly provider: ContactProvider,
  ) {}

  create(request: ContactRequest): Promise<ContactEntity> {
    const entity = new ContactEntity();
    this.mapRequestData(entity, request);
    return this.manager.create(entity);
  }

  async update(id: string, request: ContactRequest): Promise<ContactEntity> {
    const entity = await this.provider.findById(id, 'Contact not found');
    this.mapRequestData(entity, request);
    return this.manager.update(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.provider.findById(id, 'Contact not found');
    await this.manager.delete(entity);
  }

  mapRequestData(entity: ContactEntity, request: ContactRequest): void {
    entity.enterprise = { id: request.enterpriseId } as EnterpriseEntity;
    entity.name = request.name?.trim() || null;
    entity.department = request.department?.trim() || null;
  }
}
