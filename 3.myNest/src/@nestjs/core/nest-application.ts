import express, { Express} from "express";
import { Logger } from "@nest/core";



export class NestApplication {
	//在它的内部私用化一个Express实例
	private readonly app: Express = express()
	constructor(protected readonly module) { }

	async init() {
		Logger.log('Application initialized', 'NestApplication');

		//取出模块里所有的控制器，然后做好路由配置
		const controllers = Reflect.getMetadata('controllers', this.module);
		console.log('15: init.controllers: ', controllers);
	}

	async listen(port: number) {
		await this.init()
		this.app.listen(port, () => {
			Logger.log(`Application running on http://localhost:${port}`, 'NestApplication');
		})
	}


}
