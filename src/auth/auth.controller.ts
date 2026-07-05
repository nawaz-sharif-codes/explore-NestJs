import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    if (!registerUserDto) {
      throw new BadRequestException('Request body cannot be empty');
    }
    return this.authService.registerUser(registerUserDto);
  }
  @Post('login')
  loginUser() {
    return this.authService.loginUser();
  }
}
