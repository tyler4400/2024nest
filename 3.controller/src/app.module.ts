import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { LoggerModule } from "./logger.module";
@Module({
    imports:[LoggerModule],
    controllers: [AppController]
})
export class AppModule {

}