import { UserRole } from '../../user/entity/user.entity';

export class LoginDto {
  accessToken: string;
  expiresIn: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}
