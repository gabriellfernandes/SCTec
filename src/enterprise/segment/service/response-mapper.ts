import { Injectable } from '@nestjs/common';
import { SegmentDto } from '../dto/segment.dto';
import { SegmentEntity } from '../entity/segment.entity';

@Injectable()
export class SegmentResponseMapper {
  mapMultiple(entities: SegmentEntity[]): Promise<SegmentDto[]> {
    return Promise.resolve(entities.map((entity) => this.map(entity)));
  }

  map(entity: SegmentEntity): SegmentDto {
    const dto = new SegmentDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
