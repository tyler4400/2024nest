import { Module } from "@nest/common";
import { AppController } from "./app.controller";
import { UserController } from "./user.controller";
import { LoggerModule } from "./logger.module";
import { CoreModule } from "./core.module";
import { UseValueService } from "./logger.service";
import { CommonController } from "./common.controller";

@Module({
	imports:[LoggerModule, CoreModule],
	providers:[
		{
			provide: 'appModule-provider',
			useValue: new UseValueService('app.module自己的provider')
		}
	],
	controllers: [AppController, UserController, CommonController],
})
export class AppModule {

}
