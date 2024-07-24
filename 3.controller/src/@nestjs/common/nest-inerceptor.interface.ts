import { ExecutionContext } from "@nestjs/common";

export interface NestInterceptor{
    intercept(context:ExecutionContext,next)
}