import { Controller, Get, Ip, Param, Query, Req, Request, Session, Headers } from '@nest/common'
import {Request as ExpressRequest} from 'express'

@Controller('users')
export class UserController{

    name =  'user tyler'

    @Get('req')
    handleRequest(@Req() req: ExpressRequest, @Request() request: ExpressRequest){
        console.log(req.url);
        console.log(request.method)
        return 'handleRequest: ' + (req === request ? 'true' : 'false');
    }

    @Get('query')
    handleQuery(@Query() query: any, @Query('id') id: string){
        console.log('query', query);
        console.log('id', id);
        return { code: 0, data: query };
    }

    @Get('headers')
    handleHeaders(@Headers() headers: any, @Headers('accept') accept: string){
        console.log('headers',headers);
        console.log('accept',accept);
        return { code: 0, data: headers };
    }

    @Get('session')
    handleSession(@Session() session: any, @Session('pageView') pageView: string){
        console.log('session',session);
        console.log('pageView',pageView);
        if(session.pageView){
            session.pageView++;
        }else{
            session.pageView=1;
        }
        return { code: 0, data: session };
    }

    @Get('ip')
    getIp(@Ip() ip: string){
        console.log('ip',ip);
        return `ip: ${ip}`;
    }

    @Get(':username/info/:age')
    getUserNameInfo(@Param() params, @Param('username') username: string, @Param('age') age: string){
        console.log('params',params);
        console.log('username',username);
        console.log('age',age);
        return { code: 0, data: params };
    }

    @Get('star/ab*de')
    handleWildcard(){
        return `handleWildcard`
    }
}
