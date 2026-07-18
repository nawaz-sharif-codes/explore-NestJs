import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const start = process.hrtime.bigint();
    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          responseTime: Number(process.hrtime.bigint() - start) / 1000000,
        });
      }),
      map((data) => ({
        success: true,
        data,
      })),
      catchError((error) => {
        this.logger.error('error', error);
        throw error;
      }),
    );
  }
}
