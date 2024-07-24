import {  ExecutionContext, NestInterceptor } from "@nestjs/common";
import {tap} from 'rxjs/operators'
export class Logging3Interceptor implements NestInterceptor{
    async intercept(context: ExecutionContext, next) {
        console.log('Before3...')
        const now = Date.now();
        return next.handle().pipe(tap(()=>{
            console.log(`After3... ${Date.now() - now}ms`)
        }));
    }
}