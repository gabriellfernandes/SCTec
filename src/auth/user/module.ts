import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateController } from './controller/create.controller';
import { UserDeleteController } from './controller/delete.controller';
import { UserReadController } from './controller/read.controller';
import { UserUpdateController } from './controller/update.controller';
import { UserEntity } from './entity/user.entity';
import { UserManager } from './service/manager';
import { UserProvider } from './service/provider';
import { UserRequestManager } from './service/request-manager';
import { UserResponseMapper } from './service/response-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [
    UserCreateController,
    UserReadController,
    UserUpdateController,
    UserDeleteController,
  ],
  providers: [
    UserManager,
    UserProvider,
    UserRequestManager,
    UserResponseMapper,
  ],
  exports: [UserProvider],
})
export class UserModule {}
