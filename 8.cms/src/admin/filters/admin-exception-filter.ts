import { ArgumentsHost, ExceptionFilter, HttpException,Catch, BadRequestException } from "@nestjs/common";
import {Response} from 'express';
import { I18nService, I18nValidationException } from "nestjs-i18n";
@Catch(HttpException)
export class AdminExceptionFilter implements ExceptionFilter{
    constructor(private readonly i18n:I18nService){}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request:any = ctx.getRequest<Request>();
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
        }else if(exception instanceof  I18nValidationException){
            const errors = exception.errors;
            message = errors.map(error=>this.formatErrorMessage(error,request.i18nLang)).join(';')
        }
        response.status(status).render('error',{
            message
        });
    }
    formatErrorMessage(error,lang){
        const {property,value,constraints} = error;
        const constraintValues = Object.values(constraints)
        const formattedMessages = constraintValues.map((constraintValue:any)=>{
            const [key,params] = constraintValue.split('|');
            if(params){
                const parsedParams = JSON.parse(params);
                return this.i18n.translate(key,{
                    lang,
                    args:parsedParams
                });
            }
        })
        return `${property}:${value} ${formattedMessages.join(',')}`
    }
    
}
/**
[
  'validation.isNotEmpty|{"value":"","field":"password"}',
  'validation.minLength|{"value":"","constraints":[6],"field":"password","length":6}'
]

password: password不能为空, password至少需要6个字符.,
email: , email不能为空
 */