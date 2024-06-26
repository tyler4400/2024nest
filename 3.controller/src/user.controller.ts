import {Controller,
    Get,Post,Redirect,HttpCode,Header,
    Req,Request,Query,Headers,Session,Ip,Param,Body,Response,Next,
} from '@nestjs/common'
import {Request as ExpressRequest,Response as ExpressResponse} from 'express'
import { User } from './user.decorator';
@Controller('users')
export class UserController{
    @Get('req')
    handleRequest(@Req() req:ExpressRequest,age:number,@Request() request:ExpressRequest){
        console.log('url',req.url);
        console.log('age',age);
        console.log('method',request.method)
        return 'handleRequest'
    }
    @Get('query')
    handleQuery(@Query() query:any,@Query('id') id:string){
        console.log('query',query);
        console.log('id',id);
        return `query id:${id}`;
    }
    @Get('headers')
    handleHeaders(@Headers() headers:any,@Headers('accept') accept:string){
        console.log('headers',headers);
        console.log('accept',accept);
        return `accept:${accept}`;
    }
    @Get('session')
    handleSession(@Session() session:any,@Session() pageView:string){
        console.log('session',session);
        console.log('pageView',pageView);
        if(session.pageView){
            session.pageView++;
        }else{
            session.pageView=1;
        }
        return `pageView:${session.pageView}`;
    }
    @Get('ip')
    getIp(@Ip() ip:string){
        console.log('ip',ip);
        return `ip:${ip}`;
    }
    @Get(':username/info/:age')
    getUserNameInfo(@Param() params,@Param('username') username:string,@Param('age') age:string){
        console.log('params',params);
        console.log('username',username);
        console.log('age',age);
        return `age:${age}`
    }
    @Get('star/ab*de')
    handleWildcard(){
        return `handleWildcard`
    }
    @Post('create')
    @HttpCode(200)
    @Header('Cache-Control','none')//向客户端发送一个响应头
    @Header('key1','value1')
    @Header('key2','value2')
    createUser(@Body() createUserDto,@Body('username') username:string){
        console.log('createUserDto',createUserDto);
        console.log('username',username);
        throw new Error('error');
        return `user created`
    }
    @Get('response')
    response(@Response() response:ExpressResponse){
        console.log('response',response);
        response.send('send');
        //response.json({success:true});
        return `response`
    }
    @Get('passthrough')
    passthrough(@Response({passthrough:true}) response:ExpressResponse){
        //但是有些我只是想添个响应头，仅此而矣，我不想负责响应体的发送
        response.setHeader('key','value');
        //response.send('send');
        //response.json({success:true});
        //还是想返回一个值让Nest帮我们进行发送响应体操作
        return `response`
    }
    @Get('next')
    next(@Next() next){
       console.log('next')
       //如果给next传递了参数，会交给后面的错误处理中间件进行处理
       next('wrong');
    }
    @Get('/redirect')
    @Redirect('/users/req',301)
    handleRedirect(){

    } 
    @Get('/redirect2')
    handleRedirect2(@Query('version') version){
        return { url: `https://docs.nestjs.com/${version}/` ,statusCode:301};
    }
    @Get('custom')
    customParamDecorator(@User('role') role,@User() user){
        console.log('user',user)
        console.log('role',role)
        return user;
    }
}
/**
 * 在使用Nest.js的时候，一般来说一个实体会定义二个类型，一个是dto，一个是interface
 * dto 客户端向服务器提交的数据对象，比如说当用户注册的时候 {用户名，密码}
 * 然后服务器端一般会获取此dto，然后保存到数据库中，保存的时候可能会还加入一些默认值，时间戳，对密码加密
 * 还可能会过滤掉某些字段，比如注册的时候密码和确认密码，但是保存的时候只保存密码
 * 数据库里保存的数据类型一般会定义为一个interface
 * userDto {用户名，密码，确认密码}
 * userInterface {用户名，密码，创建时间，更新时间}
 */