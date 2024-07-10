import { ArgumentsHost, ExceptionFilter,Catch ,BadRequestException,RequestTimeoutException, Inject} from "@nestjs/common";
import {Request,Response} from 'express';
//@Catch(HttpException) 装饰器将所需的元数据绑定到异常过滤器，
//告诉 Nest 此特定过滤器正在查找 HttpException 类型的异常，而不是其他类型
@Catch(BadRequestException,RequestTimeoutException)
export class CustomExceptionFilter implements ExceptionFilter{
    constructor(@Inject('PREFIX') private readonly prefix){
      
    }
    catch(exception: any, host: ArgumentsHost) {
      console.log('prefix',this.prefix);
       const ctx = host.switchToHttp();
       const request = ctx.getRequest<Request>();
       const response = ctx.getResponse<Response>();
       const status = exception.getStatus();
       response.status(status)
       .json({
         statusCode:status,
         message:exception.getResponse()?.message?exception.getResponse()?.message:exception.getResponse(),
         timestamp:new Date().toLocaleString(),
         path:request.originalUrl,
         method:request.method
       })
    }
}