import { ExecutionContext, NestInterceptor } from "@nestjs/common";
import {tap} from 'rxjs/operators'
export class Logging2Interceptor implements NestInterceptor{
    async intercept(context: ExecutionContext, next)  {
        console.log('Before2...')
        const now = Date.now();
        return next.handle().pipe(tap(()=>{
            console.log(`After2... ${Date.now() - now}ms`)
        }));
    }
}