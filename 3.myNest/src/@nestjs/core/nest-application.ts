import express, { Express, Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express'
import { Logger } from "@nest/core";
import * as path from "node:path";
import 'reflect-metadata';
import { ExistingParam } from "@nest/common";

export class NestApplication {
	//在它的内部私用化一个Express实例
	private readonly app: Express = express()
	constructor(protected readonly module: Function) { }

	async init() {
		Logger.log('Application initialized', 'NestApplication');

		//取出模块里所有的控制器，然后做好路由配置
		const controllers = Reflect.getMetadata('controllers', this.module);
		for (const Controller of controllers) {
			//创建每个控制器的实例
			const controller = new Controller();
			//获取控制器的路径前缀
			const prefix = Reflect.getMetadata('prefix', Controller) || '/';

			Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver');

			const controllerPrototype = Controller.prototype;
			//遍历类的原型上的方法名
			for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
				//获取原型上的方法 index
				const method = controllerPrototype[methodName];
				//取得此函数上绑定的方法名的元数据
				const httpMethod = Reflect.getMetadata('method', method);//GET
				//取得此函数上绑定的路径的元数据
				const pathMetadata = Reflect.getMetadata('path', method);
				//如果方法名不存在，则不处理
				if (!httpMethod) continue;
				//拼出来完整的路由路径
				const routePath = path.posix.join('/', prefix, pathMetadata)

				//配置路由，当客户端以httpMethod方法请求routePath路径的时候，会由对应的函数进行处理
				this.app[httpMethod.toLowerCase()](routePath, (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
					const args = this.resolveParams(controller, methodName, req, res, next);
					const result = method.call(controller, ...args);
					res.send(result);
				})
				Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RoutesResolver');
			}
		}
		Logger.log(`Nest application successfully started`, 'NestApplication');
	}

	private resolveParams(instance: any, methodName: string, req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
		//获取参数的元数据
		/**
		 * 在defineMetaData的时候，target的是原型，这里使用的示例。这是ok的，因为getMetadata会通过原型链查找，如果是getOwnMetadata则会找不到
		 */
		const paramsMetaData: ExistingParam[] = Reflect.getMetadata(`params`, instance, methodName);
		console.log('52: resolveParams.paramsMetaData: ', paramsMetaData);
		//[{ parameterIndex: 0, key: 'Req' },{ parameterIndex: 1, key: 'Request' }]
		//此处就是把元数据变成实际的参数
		if (!paramsMetaData) return []
		return paramsMetaData.map((paramMetaData) => {
			const { key, data } = paramMetaData;
			switch (key) {
				case "Request":
				case "Req":
					return req;
				case "Query":
					return data ? req.query[data] : req.query
				default:
					return null;
			}
		})
		//[req,req]
	}

	async listen(port: number) {
		await this.init()
		this.app.listen(port, () => {
			Logger.log(`Application running on http://localhost:${port}`, 'NestApplication');
		})
	}


}
