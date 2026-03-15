import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { LoginDto } from '../dto/login.dto';
import { LoginRequest } from '../dto/login.request';
import { UserProvider } from '../../user/service/provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly userProvider: UserProvider,
    private readonly jwtService: JwtService,
  ) {}

  async login(request: LoginRequest): Promise<LoginDto> {
    const user = await this.userProvider.findByEmail(request.email);

    if (!user || !user.active) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await compare(request.password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      expiresIn: '1h',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
