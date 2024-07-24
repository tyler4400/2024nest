import { ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class Logging1Interceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: any): Observable<any>;
}
