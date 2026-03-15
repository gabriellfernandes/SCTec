import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UserRequest } from '../dto/user.request';
import { UserEntity } from '../entity/user.entity';
import { UserManager } from './manager';
import { UserProvider } from './provider';

@Injectable()
export class UserRequestManager {
  constructor(
    private readonly manager: UserManager,
    private readonly provider: UserProvider,
  ) {}

  async create(request: UserRequest): Promise<UserEntity> {
    const existingUser = await this.provider.findByEmail(request.email);

    if (existingUser) {
      throw new ConflictException('User email already exists');
    }

    const entity = new UserEntity();
    await this.mapRequestData(entity, request);
    return this.manager.create(entity);
  }

  async update(id: string, request: UserRequest): Promise<UserEntity> {
    const entity = await this.provider.findById(id, 'User not found');
    const existingUser = await this.provider.findByEmail(request.email);

    if (existingUser && existingUser.id !== entity.id) {
      throw new ConflictException('User email already exists');
    }

    await this.mapRequestData(entity, request);
    return this.manager.update(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.provider.findById(id, 'User not found');
    await this.manager.delete(entity);
  }

  async mapRequestData(
    entity: UserEntity,
    request: UserRequest,
  ): Promise<void> {
    entity.name = request.name;
    entity.email = request.email;
    entity.passwordHash = await hash(request.password, 10);
    entity.role = request.role;
    entity.active = true;
  }
}
