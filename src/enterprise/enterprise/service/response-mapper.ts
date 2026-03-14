import { Injectable } from '@nestjs/common';
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
    dto.city = entity.city;
    dto.segment = entity.segment;
    dto.contact = entity.contact;
    dto.active = entity.active;
    return dto;
  }
}
