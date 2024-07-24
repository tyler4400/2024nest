import {  ExecutionContext, NestInterceptor } from "@nestjs/common";
import {tap} from 'rxjs/operators'
export class Logging1Interceptor implements NestInterceptor{
    async intercept(context: ExecutionContext, next) {
        console.log('Before1...')
        const now = Date.now();
        return next.handle().pipe(tap(()=>{
            console.log(`After1... ${Date.now() - now}ms`)
        }));
    }
}