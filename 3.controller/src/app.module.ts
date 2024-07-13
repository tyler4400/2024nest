import {MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { App2Controller } from './app2.controller';
import { AppService } from "./app.service";
function logger1(req,res,next){
    console.log('logger1');
    next();
}
function logger2(req,res,next){
    console.log('logger2');
    next();
}
@Module({
    controllers: [AppController,App2Controller],
    providers:[
        {
           provide:'PREFIX',
           useValue:"prefix"
        },
        AppService
    ]
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(logger1,logger2)
        .forRoutes(AppController,App2Controller)
    }
}