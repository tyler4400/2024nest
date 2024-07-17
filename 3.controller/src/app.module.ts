import {MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import {AccountController} from './account.controller';
import {MyPipe} from './my.pipe';
import { APP_PIPE } from "@nestjs/core";
import {AuthMiddleware} from './auth.middleware';
@Module({
    controllers: [AppController,AccountController],
    providers:[
        {
            provide:'PREFIX',
            useValue:'prefix'
        },
        {
            provide:APP_PIPE,
            useClass:MyPipe
        }
    ]
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
    }
    
}