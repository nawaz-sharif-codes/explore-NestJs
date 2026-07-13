import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  fetchUser(id: number) {
    if (!id) {
      throw new BadRequestException('id field cannot be empty');
    }
    if (id === 100) {
      throw new NotFoundException(`User Id ${id} is not found`);
    }
    return {
      success: true,
      message: 'User fetched successfully',
      data: {
        firstName: 'Nawaz',
        lastName: 'Sharif',
        email: 'nawaz@gmail.com',
      },
    };
  }
}
