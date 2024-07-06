import { NestFactory } from "@nestjs/core";
import {AppModule} from './app.module';
import session from 'express-session';
//import {loggerFunction} from './logger-function.middleware'
function getMiddleware(val){
    return (req,res,next)=>{
        console.log(val)
        next()
    }
}
async function bootstrap(){
    const app = await NestFactory.create(AppModule);
    app.use(session({
        secret:'your-secret-key',//用于加密会话的密钥
        resave:false,//在每次请求结束后是否强制保存会话，即使它没有改变
        saveUninitialized:false,//是否保存未初始化的会话
        cookie:{maxAge:1000*60*60*24}//定义会话的cookie配置，设置cookie的最大存活时间是一天
    }));
    //这样可以注册全局的中间件，可以绑定到每个注册的路由上
    //app.use(loggerFunction);
    app.use(getMiddleware('A'));
    await app.listen(3000);
}
bootstrap();