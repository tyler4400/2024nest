import { Controller, Get,HttpException, HttpStatus,BadRequestException,RequestTimeoutException ,UseFilters} from '@nestjs/common'
import { ForbiddenException } from './forbidden.exception'
import { CustomExceptionFilter } from './custom-exception.filter';
@Controller()
//异步过滤器可以设置为控制器级别的，针对控制器里所有的方法生效
//@UseFilters(CustomExceptionFilter)
export class AppController {
   @Get('exception')
   exception(){
    //当异常是未识别的（既不是 HttpException 也不是继承自 HttpException 的类）
    //throw new Error('未识别');
   // {"statusCode":500,"message":"Internal server error"}
    //throw new HttpException('Forbidden',HttpStatus.FORBIDDEN)
    //{"statusCode":403,"message":"Forbidden"}
     throw new HttpException({
        errorCode:'E00001',//用户未授权
        status:HttpStatus.FORBIDDEN,
        error:'这是一个自定义的错误消息'
    },HttpStatus.FORBIDDEN) 
    //{"status":403,"error":"这是一个自定义的错误消息"}
   }

   @Get('custom')
   custom(){
      throw new ForbiddenException();
   }

// @UseFilters(CustomExceptionFilter)
   @Get('bad-request')
   //异步过滤器可以设置为路由方法级别的，特定的方法生效
   badRequest(){
      throw new BadRequestException('Something bad happended','Some error occur');
   }
   @Get('requestTimeout')
// @UseFilters(CustomExceptionFilter)
   requestTimeout(){
      throw new RequestTimeoutException('Request Timeout','Request Timeout');
   }
}