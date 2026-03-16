import { UserRole } from '../entity/user.entity';

export class UserDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}
