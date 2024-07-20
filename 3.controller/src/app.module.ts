import { Module } from "@nestjs/common";
import {PayController} from './pay.controller';
@Module({
    controllers: [PayController],
})
export class AppModule {}