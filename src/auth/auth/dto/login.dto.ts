import { UserRole } from '../../user/entity/user.entity';

export class LoginDto {
  accessToken: string;
  expiresIn: string;
  user: AuthMeDto;
}

export class AuthMeDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}
