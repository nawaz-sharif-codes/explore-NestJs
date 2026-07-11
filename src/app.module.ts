import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PasswordHashModule } from './common/password-hash/password-hash.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongodbConfig from './config/mongodb.config';
import passwordHashConfig from './config/passwordHash.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PasswordHashModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongodbConfig, passwordHashConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
