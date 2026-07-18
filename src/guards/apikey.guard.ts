import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyGuard.name);
  constructor(private readonly configService: ConfigService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.header('x-api-key');
    if (!apiKey) {
      throw new BadRequestException('API key is missing');
    }
    const apiKeySecret = this.configService.get<string>('apiKey.secret');
    this.logger.log('apiKeySecret', apiKeySecret);
    if (apiKey === apiKeySecret) return true;
    else {
      throw new UnauthorizedException();
    }
  }
}
