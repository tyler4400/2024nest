import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next): Observable<any> {
      return next
        .handle()
        .pipe(
          catchError(err => throwError(() => new BadGatewayException())),
        );
    }
  }
  