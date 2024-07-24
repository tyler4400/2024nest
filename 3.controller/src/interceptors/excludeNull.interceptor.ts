import {  ExecutionContext, NestInterceptor } from "@nestjs/common";
import {map} from 'rxjs/operators';
export class ExcludeNullInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next) {
        return next.handle().pipe(map((data)=>{
            console.log('ExcludeNullInterceptor')
            return data === null || data == undefined?'':data
        }));
    }
}