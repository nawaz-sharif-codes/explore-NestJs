import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const requestId = req.header('x-request-id') ?? 'unknown';
    this.logger.log(
      `Incoming ${method} request ${requestId} on api : ${originalUrl} from ipAddress : ${ip}`,
    );
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(
        `Outgoing response from ${method} request ${requestId} on api : ${originalUrl} from ipAddress : ${ip} in ${duration}ms with statusCode ${res.statusCode}`,
      );
    });
    next();
  }
}
