import { Module } from "@nest/common";
import { AppController } from "./app.controller";
import { UserController } from "./user.controller";
import { LoggerClassService, UseValueService } from "./logger.service";

@Module({
	controllers: [AppController, UserController],
	providers: [
		LoggerClassService,
		{//也个也是一种定义provider的方法
			provide: 'StringToken',//这是一个token，也称为标志 ，或者说令牌，也就是provider的名字
			useValue: new UseValueService('prefix') //可以直接提供一个自己new的示例
		},
	],
})
export class AppModule {

}
