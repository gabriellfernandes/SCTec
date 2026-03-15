import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Public } from '../decorator/public.decorator';
import { AuthMeDto, LoginDto } from '../dto/login.dto';
import { LoginRequest } from '../dto/login.request';
import { AuthService } from '../service/auth.service';
import type { Request } from 'express';
import { JwtPayload } from '../service/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() request: LoginRequest): Promise<LoginDto> {
    return this.authService.login(request);
  }

  @Get('me')
  me(@Req() request: Request & { user: JwtPayload }): Promise<AuthMeDto> {
    return this.authService.me(request.user.sub);
  }
}
