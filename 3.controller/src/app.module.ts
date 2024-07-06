import { MiddlewareConsumer, Module, NestModule,RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { DynamicConfigModule } from "./dynamicConfig.module";
import {AppService} from './app.service';
import { LoggerMiddleware } from "./logger.middleware";
import {loggerFunction} from './logger-function.middleware'
@Module({
    imports:[
        DynamicConfigModule.forRoot('456')
    ],
    controllers: [AppController],
    providers:[AppService],
    exports:[AppService]
})
//export class AppModule{}
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        //要针对/config的路径应用LoggerMiddleware中间件
        consumer
        //.apply(LoggerMiddleware)
        .apply(loggerFunction)
        .forRoutes('*')
        //.forRoutes('config');
        //.forRoutes({path:'config',method:RequestMethod.POST})
        //.forRoutes('ab*de')
        //.exclude({path:'app/config',method:RequestMethod.GET})
        //.forRoutes(AppController)
    }
}