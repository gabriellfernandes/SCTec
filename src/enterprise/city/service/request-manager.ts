import { Injectable } from '@nestjs/common';
import { CityRequest } from '../dto/city.request';
import { CityEntity } from '../entity/city.entity';
import { CityManager } from './manager';
import { CityProvider } from './provider';

@Injectable()
export class CityRequestManager {
  constructor(
    private readonly manager: CityManager,
    private readonly provider: CityProvider,
  ) {}

  create(request: CityRequest): Promise<CityEntity> {
    const entity = new CityEntity();
    this.mapRequestData(entity, request);
    return this.manager.create(entity);
  }

  async update(id: string, request: CityRequest): Promise<CityEntity> {
    const entity = await this.provider.findById(id, 'City not found');
    this.mapRequestData(entity, request);
    return this.manager.update(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.provider.findById(id, 'City not found');
    await this.manager.delete(entity);
  }

  mapRequestData(entity: CityEntity, request: CityRequest): void {
    entity.name = request.name;
  }
}
