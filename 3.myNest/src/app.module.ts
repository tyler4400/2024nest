import { Module } from "@nest/common";
import { AppController } from "./app.controller";
import { UserController } from "./user.controller";
import { LoggerModule } from "./logger.module";

@Module({
	imports:[LoggerModule],
	controllers: [AppController, UserController],
})
export class AppModule {

}
