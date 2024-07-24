import { Module } from "@nestjs/common";
import {PayController} from './pay.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logging5Interceptor } from "./interceptors/logger5.interceptor";
import { Logging6Interceptor } from "./interceptors/logger6.interceptor";
@Module({
    controllers: [PayController],
    providers:[
        {
            provide:APP_INTERCEPTOR,
            useClass:Logging6Interceptor
        },
        {
            provide:APP_INTERCEPTOR,
            useClass:Logging5Interceptor
        },
    ]
})
export class AppModule {}
/**
 * let globalProviderMap = {
    * APP_INTERCEPTOR:{
        * Logging5Interceptor:new Logging5Interceptor(),
        * Logging6Interceptor:new Logging6Interceptor()
    * }
 * }
 */