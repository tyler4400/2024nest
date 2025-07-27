import express, { Express, Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express'
import { Logger } from "@nest/core";
import * as path from "node:path";
import 'reflect-metadata';
import { DESIGN_PARAMTYPES, ExistingParam, INJECTED_TOKENS } from "@nest/common";

export class NestApplication {
	//在它的内部私用化一个Express实例
	private readonly app: Express = express()

	//在这个字段保存全部的providers
	private readonly providers = new Map()

	constructor(protected readonly module: Function) {
		this.app.use(express.json());//用来把JSON格式的请求体对象放在req.body上
		this.app.use(express.urlencoded({ extended: true }));//把form表单格式的请求体对象放在req.body

		// 遍历模块， 构建每个模块的依赖关系，从而初始化providers
		this.initModule();
		console.log('所有的providers映射表', this.providers);

	}

	private initModule(): void {
		const imports = Reflect.getMetadata('imports', this.module) ?? [];

		// 遍历处理导入的模块
		for (const importModule of imports) {
			this.registerProvidersFromModule(importModule);
		}

		// 最后给root模块初始化
		Logger.log('Module initialized', this.module.name);

		//获取当前模块提供者的元数据
		const providers = Reflect.getMetadata('providers', this.module) ?? [];
		//遍历并添加每个提供者
		for (const provider of providers) {
			this.initProviders(provider);
		}
	}

	private registerProvidersFromModule(module) {
		Logger.log('Module initialized', module.name);

		//拿到导入的模块providers进行全量注册
		const importedProviders = Reflect.getMetadata('providers', module) ?? [];
		//1.有可能导入的模块只导出了一部分，并没有全量导出,所以需要使用exports进行过滤
		const exports = Reflect.getMetadata('exports', module) ?? [];
		//遍历导出exports数组
		for (const exportToken of exports) {
			//2.exports里还可能有module
			if (this.isModule(exportToken)) {
				//要执行递归操作
				this.registerProvidersFromModule(exportToken);
			} else {
				const provider = importedProviders.find(provider => provider === exportToken || provider.provide == exportToken);
				if (provider) {
					this.initProviders(provider);
				}
			}
		}
	}

	private isModule(exportToken) {
		return exportToken && exportToken instanceof Function && Reflect.getMetadata('isModule', exportToken);
	}

	private initProviders(provider: any): void {
		//为了避免循环依赖，每次添加前可以做一个判断，如果Map中已经存在，则直接返回
		//const injectToken = provider.provide??provider;
		//if(this.providers.has(injectToken)) return;
		//如果有provider的token,并且有useClass属性，说明提供的是一个类，需要实例化

			// 处理provider的几种情况
		if (!provider.provide) {
			//表示只提供了一个类,token是这个类，值是这个类的实例
			const dependencies = this.resolveDependencies(provider);
			this.providers.set(provider, new provider(...dependencies));
			return
		}
		if (provider.useClass) {
			const dependencies = this.resolveDependencies(provider.useClass);
			const instance = new provider.useClass(...dependencies);
			this.providers.set(provider.provide, instance);
		}
		if (provider.useValue) {
			//提供的是一个值，则不需要容器帮助实例化，直接使用此值注册就可以了
			this.providers.set(provider.provide, provider.useValue)
		}
		if(provider.useFactory) {
			const inject = provider.inject ?? []
			const params = inject.map(item => this.providers.get(item) ?? item)
			const instance = provider.useFactory(...params)
			this.providers.set(provider.provide, instance)

		}


	}

	use(middleware) {
		this.app.use(middleware)
	}


	private resolveDependencies(Clazz: any){
		//取得由@Inject('StringToken') 注入的token
		const injectTokens = Reflect.getMetadata(INJECTED_TOKENS, Clazz) ?? [];
		//获取构造函数的参数类型. 这个是ts自动注入的
		const constructorParams = Reflect.getMetadata(DESIGN_PARAMTYPES, Clazz) ?? [];
		return constructorParams.map((param, index) => {
			//把每个param中的token默认换成对应的provider值
			return this.providers.get(injectTokens[index] ?? param);
		})

	}

	private async init() {
		Logger.log('Application initialized', 'NestApplication');

		//取出模块里所有的控制器，然后做好路由配置
		const controllers = Reflect.getMetadata('controllers', this.module);
		for (const Controller of controllers) {
			//解析出控制器的依赖
			const dependencies = this.resolveDependencies(Controller)
			//创建每个控制器的实例
			const controller = new Controller(...dependencies);
			//获取控制器的路径前缀
			const prefix = Reflect.getMetadata('prefix', Controller) || '/';

			Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver');

			const controllerPrototype = Controller.prototype;
			//遍历类的原型上的方法名
			for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
				//获取原型上的方法 index
				const method: Function = controllerPrototype[methodName];
				//取得此函数上绑定的方法名的元数据
				const httpMethod: string = Reflect.getMetadata('method', method); //GET
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

					//判断controller的methodName方法里有没有使用Response或Res参数装饰器，如果用了任何一个则不发响应
					const responseMetadata = this.getResponseMetadata(controller, methodName);
					//或者没有注入Response参数装饰器，或者注入了但是传递了passthrough参数，都会由Nest.js来返回响应
					if (!responseMetadata || (responseMetadata?.data?.passthrough)) {
						// headers.forEach(({ name, value }) => {
						// 	res.setHeader(name, value);
						// });
						//把返回值序列化发回给客户端
						res.send(result);
					} else {
						Logger.log('请求已挂起', responseMetadata.key)
					}
				})
				Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RoutesResolver');
			}
		}
		Logger.log(`Nest application successfully started`, 'NestApplication');
	}

	private getResponseMetadata(controller, methodName: string) {
		const paramsMetaData: ExistingParam[] = Reflect.getMetadata(`params`, controller, methodName) ?? [];
		return paramsMetaData.filter(Boolean).find((param) => ['Response', 'Res', 'Next'].includes(param.key))
	}

	private resolveParams(instance: any, methodName: string, req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
		//获取参数的元数据
		/**
		 * 在defineMetaData的时候，target的是原型，这里使用的示例。这是ok的，因为getMetadata会通过原型链查找，如果是getOwnMetadata则会找不到
		 */
		const paramsMetaData: ExistingParam[] = Reflect.getMetadata(`params`, instance, methodName) || [];
		//[{ parameterIndex: 0, key: 'Req' },{ parameterIndex: 1, key: 'Request' }]
		//此处就是把元数据变成实际的参数
		return paramsMetaData.map((paramMetaData) => {
			const { key, data, factory } = paramMetaData;
			switch (key) {
				case "Request":
				case "Req":
					return req;
				case "Query":
					return data ? req.query[data] : req.query;
				case "Headers":
					return data ? req.headers[data] : req.headers;
				case 'Session':
					return data ? req.session[data] : req.session;
				case 'Ip':
					return req.ip;
				case 'Param':
					return data ? req.params[data] : req.params;
				case 'Body':
					return data ? req.body[data] : req.body;
				case 'Cookie':
				  console.log('90: resolveParams.req.cookies[data]: ', req.cookies);
					return data ? req.cookies[data] : req.cookies;
				case "Response":
				case "Res":
					return res;
				case "Next":
					return next;
				case "DecoratorFactory":
					// 这里写个假的示例
					const ctx = {
						//因为Nest不但支持http,还支持graphql 微服务 websocket
						switchToHttp: () => ({
							getRequest: () => req,
							getResponse: () => req,
							getNext: () => next,
						})
					}
					return factory(data, ctx);
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
