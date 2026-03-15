import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../decorator/public.decorator';
import { LoginDto } from '../dto/login.dto';
import { LoginRequest } from '../dto/login.request';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() request: LoginRequest): Promise<LoginDto> {
    return this.authService.login(request);
  }
}
