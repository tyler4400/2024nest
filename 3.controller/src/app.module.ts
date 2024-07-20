import { Module } from "@nestjs/common";
import {AccountController} from './account.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from "./auth.guard";
@Module({
    controllers: [AccountController],
    providers:[
        {
            provide:APP_GUARD,
            useClass:AuthGuard
        }
    ]
})
export class AppModule {}