import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PasswordHashModule } from '../common/password-hash/password-hash.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, PasswordHashModule],
})
export class AuthModule {}
