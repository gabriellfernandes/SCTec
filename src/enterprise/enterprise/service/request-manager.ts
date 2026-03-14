import { Injectable } from '@nestjs/common';
import { EnterpriseRequest } from '../dto/enterprise.request';
import { EnterpriseEntity } from '../entity/enterprise.entity';
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
    entity.city = request.city;
    entity.segment = request.segment;
    entity.contact = request.contact;
    entity.active = request.active;
  }
}
