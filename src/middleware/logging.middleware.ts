import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const requestId = req.header('x-request-id') ?? 'unknown';
    this.logger.log('Incoming Request :', {
      requestId,
      method,
      originalUrl,
      ip,
    });
    const start = Date.now();

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const duration = Date.now() - start;
      this.logger.log('Outgoing Response :', {
        requestId,
        method,
        originalUrl,
        ip,
        duration,
        statusCode,
      });
    });
    next();
  }
}
