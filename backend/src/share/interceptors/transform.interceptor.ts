import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    // Special case for download file, do not map data
    if (
      String(request.url).includes('export') &&
      request.method === 'GET'
    ) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: HttpStatus.OK,
      })),
    );
  }
}
