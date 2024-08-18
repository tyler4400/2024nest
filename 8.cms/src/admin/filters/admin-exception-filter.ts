import { ArgumentsHost, ExceptionFilter, HttpException,Catch, BadRequestException } from "@nestjs/common";
import {Response} from 'express';
@Catch(HttpException)
export class AdminExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let status = exception.getStatus();
        let message = exception.message;
        //说明可以是验证管道抛出的异常
        if(exception instanceof BadRequestException){
            const execptionBody:any = exception.getResponse();
            if(typeof execptionBody === 'object' && execptionBody.message){
                message = execptionBody.message.join(',')
                status = execptionBody.statusCode;
            }
        }
        response.status(status).render('error',{
            message
        });
    }
    
}