import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordHashService {
  constructor(private readonly configService: ConfigService) {}
  async passwordHash(password: string): Promise<string> {
    try {
      const rounds = this.configService.get<number>('SALT_ROUNDS', 10);
      const passwordHash = await bcrypt.hash(password, Number(rounds));
      return passwordHash;
    } catch (error) {
      console.log('Error occured while hashing the password, ', error);
      throw new InternalServerErrorException('Failed to hash password');
    }
  }
}
