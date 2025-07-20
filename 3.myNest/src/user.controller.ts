import { Controller, Get, Ip, Param, Query, Req, Request, Session, Headers, Body, Post, Cookie, Response } from '@nest/common'
import {Request as ExpressRequest, Response as ExpressResponse} from 'express'
import { Logger } from "@nest/core";

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

    @Post('create')
    // @HttpCode(200)
    // @Header('Cache-Control','none')//向客户端发送一个响应头
    // @Header('key1','value1')
    // @Header('key2','value2')
    createUser(@Body() createUserDto, @Body('username') username: string){
        console.log('createUserDto', createUserDto);
        console.log('username', username);
        return { code: 0, data: createUserDto };
    }


    @Post('cookie')
    getCookie(@Cookie() cookies: object, @Cookie('abc') abc: string){
        console.log('74: getcookie.cookies: ', cookies);
        console.log('74: getcookie.abc: ', abc);
        return { code: 0, data: cookies };
    }

    @Get('response')
    response(@Response() response: ExpressResponse){
        response.send('send');
        //response.json({success:true});
        return `response`
    }

    @Get('hangout')
    hangout(@Response() response: ExpressResponse){
        Logger.log('未使用response，请求应该被挂起', 'hangout')
    }

    @Get('passthrough')
    passthrough(@Response({ passthrough: true }) response: ExpressResponse){
        //但是有些我只是想添个响应头，仅此而矣，我不想负责响应体的发送
        response.setHeader('key','value');
        //response.send('send');
        //response.json({success:true});
        //还是想返回一个值让Nest帮我们进行发送响应体操作
        return `有些我只是想添个响应头，仅此而矣，我不想负责响应体的发送`
    }
}
