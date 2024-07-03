import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { CommonModule } from "./common.module";
import { Common2Module } from "./common2.module";
import { OtherModule } from "./other.module";
@Module({
    imports:[CommonModule,Common2Module,OtherModule],
    controllers: [AppController],
    providers:[]
})
export class AppModule {

}