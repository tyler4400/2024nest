import {Controller,Get,Req,Request} from '@nestjs/common'
import {Request as ExpressRequest} from 'express'
@Controller('users')
export class UserController{
    @Get('req')
    handleRequest(@Req() req:ExpressRequest,@Request() request:ExpressRequest){
        console.log(req.url);
        console.log(request.method)
        return 'handleRequest'
    }
}