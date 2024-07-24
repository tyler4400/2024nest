import {  ExecutionContext, NestInterceptor } from "@nestjs/common";
import {tap} from 'rxjs/operators'
export class Logging6Interceptor implements NestInterceptor{
    async intercept(context: ExecutionContext, next) {
        console.log('Before6...')
        const now = Date.now();
        return next.handle().pipe(tap(()=>{
            console.log(`After6... ${Date.now() - now}ms`)
        }));
    }
}