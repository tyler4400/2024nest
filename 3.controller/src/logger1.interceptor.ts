import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators'
export class Logging1Interceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
        console.log('Before1...')
        const now = Date.now();
        return next.handle().pipe(tap(()=>{
            console.log(`After1... ${Date.now() - now}ms`)
        }));
    }
}