import {  ExecutionContext, NestInterceptor,CallHandler } from "@nestjs/common";
import {map} from 'rxjs/operators';
export class TransformInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next:CallHandler) {
        return next.handle().pipe(map((data)=>{
            console.log('TransformInterceptor');
            return {data}
        }));
    }
}