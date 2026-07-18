import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PasswordHashModule } from './common/password-hash/password-hash.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import mongodbConfig from './config/mongodb.config';
import passwordHashConfig from './config/passwordHash.config';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { RequestIdMiddleware } from './middleware/requestId.middleware';

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
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware, LoggingMiddleware)
      .forRoutes(
        { path: '/customer/register', method: RequestMethod.POST },
        { path: '/customer/id', method: RequestMethod.GET },
      );
  }
}
