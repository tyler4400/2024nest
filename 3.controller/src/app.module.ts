import {Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { CustomExceptionFilter } from './custom-exception.filter';
import {APP_FILTER} from '@nestjs/core';
@Module({
    controllers: [AppController],
    providers:[
        {
           provide:'PREFIX',
           useValue:"prefix"
        },
        {
            provide:APP_FILTER,
            useClass:CustomExceptionFilter
        }
    ]
})
export class AppModule {

}