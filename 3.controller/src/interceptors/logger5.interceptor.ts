import {  ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators'
export class Logging5Interceptor implements NestInterceptor{
    async intercept(context: ExecutionContext, next) {
        console.log('Before5...')
        const now = Date.now();
        return next.handle().pipe(tap(()=>{
            console.log(`After5... ${Date.now() - now}ms`)
        }));
    }
}