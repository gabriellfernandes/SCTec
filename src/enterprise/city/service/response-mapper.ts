import { Injectable } from '@nestjs/common';
import { CityDto } from '../dto/city.dto';
import { CityEntity } from '../entity/city.entity';

@Injectable()
export class CityResponseMapper {
  mapMultiple(entities: CityEntity[]): Promise<CityDto[]> {
    return Promise.resolve(entities.map((entity) => this.map(entity)));
  }

  map(entity: CityEntity): CityDto {
    const dto = new CityDto();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
