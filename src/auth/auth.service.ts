import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { PasswordHashService } from '../common/password-hash/password-hash.service';
import { UserLoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHashService: PasswordHashService,
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      const hashPassword = await this.passwordHashService.passwordHash(
        registerUserDto.password,
      );
      registerUserDto.password = hashPassword;
      return this.userService.createUser(registerUserDto);
    } catch (error) {
      console.log('Error occured while creating the user,', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
  loginUser(userLoginDto: UserLoginDto) {
    return {
      success: true,
      message: 'User logged in successfully',
      data: userLoginDto,
    };
  }
}
