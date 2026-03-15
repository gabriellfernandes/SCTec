import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserResponseMapper {
  mapMultiple(entities: UserEntity[]): Promise<UserDto[]> {
    return Promise.resolve(entities.map((entity) => this.map(entity)));
  }

  map(entity: UserEntity): UserDto {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.role = entity.role;
    dto.active = entity.active;
    return dto;
  }
}
