import {Module } from "@nestjs/common";
import { AppController } from './app.controller';
import {MyPipe} from './my.pipe';
import { APP_PIPE } from "@nestjs/core";
@Module({
    controllers: [AppController],
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
export class AppModule{}