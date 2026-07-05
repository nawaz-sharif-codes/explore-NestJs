import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Injectable()
export class UserService {
  createUser(registerUserDto: RegisterUserDto) {
    return {
      sucess: true,
      message: 'User created successfully',
      data: registerUserDto,
    };
  }
}
