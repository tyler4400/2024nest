import { Module } from "@nest/common";
import { AppController } from "./app.controller";

@Module({
	controllers: [AppController]
})
export class AppModule {

}
