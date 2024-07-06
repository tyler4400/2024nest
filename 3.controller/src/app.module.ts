import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { DynamicConfigModule } from "./dynamicConfig.module";
import {AppService} from './app.service';
@Module({
    imports:[
        DynamicConfigModule.forRoot('456')
    ],
    controllers: [AppController],
    providers:[AppService],
    exports:[AppService]
})
export class AppModule {

}