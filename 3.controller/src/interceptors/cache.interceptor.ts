import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
  } from '@nestjs/common';
  import {Request} from 'express';
  import { Observable, of } from 'rxjs';
  import {tap} from 'rxjs/operators';
  let cacheMap = new Map([]);
  //cacheMap.set('1',{id:1,name:'user1'})
  @Injectable()
  export class CacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next): Observable<any> {
      const request = context.switchToHttp().getRequest<Request>();
      const id = request.query.id;
      const user = cacheMap.get(id);
      if(user){
        return of(user);
      }
      return next.handle().pipe(tap(value=>{
        cacheMap.set(id,value);
      }))
    }
  }
  