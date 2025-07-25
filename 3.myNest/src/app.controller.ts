import { Controller, Get, Inject } from '@nest/common'
import { LoggerClassService, LoggerService, UseFactory, UseValueService } from "./logger.service";

@Controller()
export class AppController {

	constructor(
		private loggerClassService: LoggerClassService,
		private loggerService: LoggerService,
		@Inject('StringToken') private useValueService: UseValueService,
		@Inject('FactoryToken') private useFactory: UseFactory,
	) {

	}
	//使用Get装饰器标记index方法为HTTP GET路由处理程序
	@Get()
	index(){
		return 'hello'
	}

	@Get('info')
	main(){
		return 'info'
	}

	@Get('inject-test')
	injectTest() {
		let str = ''
		str += this.loggerClassService.log('注入了\n');
		str += this.loggerService.log('注入了\n');
		str += this.useValueService.log('注入了\n');
		str += this.useFactory.log('注入了\n');
		return str;
	}
}
