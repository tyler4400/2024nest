import 'reflect-metadata';
import express, { Express, Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express'
import { Logger } from "./logger";
import path from 'path'
import { ArgumentsHost, RequestMethod,GlobalHttpExectionFilter,defineModule,INJECTED_TOKENS, DESIGN_PARAMTYPES } from '@nestjs/common'
import { APP_FILTER } from './constants';
export class NestApplication {
    //在它的内部私用化一个Express实例
    private readonly app: Express = express()
    //在此处保存所有的provider的实例key就是token, 值就是类的实例或者值
    private readonly providerInstances = new Map()
    //此入存放着全局可用的提供者和token
    private readonly globalProviders = new Set()
    //记录每个模块里有哪些provider的token
    private readonly moduleProviers = new Map()
    //记录所有的中间件 可是中间件的类，也可能是中间件的实例，也可有是一个函数中间件
    private readonly middlewares = []
    //记录所有的要排除的路径
    private readonly excludedRoutes = []
    //添加一个默认的全局异常过滤器
    private readonly defaultGlobalHttpExceptionFilter = new GlobalHttpExectionFilter()
    //这里存放着所有的全局的异常过滤器
    private readonly globalHttpExceptionFilters = []
    constructor(protected readonly module) {
        this.app.use(express.json());//用来把JSON格式的请求体对象放在req.body上
        this.app.use(express.urlencoded({ extended: true }));//把form表单格式的请求体对象放在req.body
    }
    useGlobalFilters(...filters){
        defineModule(this.module,filters.filter(filter=>filter instanceof Function));
        this.globalHttpExceptionFilters.push(...filters);
    }
    exclude(...routeInfos): this {
        this.excludedRoutes.push(...routeInfos.map(this.normalizeRouteInfo));
        return this;
    }
    initMiddlewares() {
        //调用配置中间的的方法，MiddlewareConsumer就是当前的NestApplication的实例
        this.module.prototype.configure?.(this);
    }
    apply(...middleware) {
        //把接收到的中间件放到中间数组中，并且返回当前的实例
        defineModule(this.module, middleware)
        this.middlewares.push(...middleware);
        return this;
    }
    getMiddelwareInstance(middleware) {
        if (middleware instanceof Function) {
            const dependencies = this.resolveDependencies(middleware);
            return new middleware(...dependencies);
        }
        return middleware;
    }
    //this.isExcluded执行的时候 也没有返回this 有影响吗
    isExcluded(reqPath: string, method: RequestMethod) {
        //遍历要排除的路径，看看哪个一个排除的路径和当前的请求路径和方法名匹配
        return this.excludedRoutes.some(routeInfo => {
            const { routePath, routeMethod } = routeInfo;
            return routePath === reqPath && (routeMethod === RequestMethod.ALL || routeMethod === method)
        });
    }
    forRoutes(...routes) {
        //遍历路径信息
        for (const route of routes) {
            //遍历中间件
            for (const middleware of this.middlewares) {
                //把route格式化为标准对象，一个是路径，一个请求方法
                const { routePath, routeMethod } = this.normalizeRouteInfo(route);
                //use方法的第一个参数就表示匹配的路径,如果不匹配根本就进不来
                this.app.use(routePath, (req, res, next) => {
                    //forRoutes 和 exclude调用顺序会不会对程序结果有影响
                    //如果当前的路径要排除掉的话，那么不走当前的中间件了
                    if (this.isExcluded(req.originalUrl, req.method)) {
                        return next();
                    }
                    //如果配置方法名是All。或者方法相同完全 匹配
                    if (routeMethod === RequestMethod.ALL || routeMethod === req.method) {
                        //此处middleware可能是一个类，也可能是一个实例，也可能只是一个函数
                        if ('use' in middleware.prototype || 'use' in middleware) {
                            const middlewareInstance = this.getMiddelwareInstance(middleware);
                            middlewareInstance.use(req, res, next);
                        } else if (middleware instanceof Function) {
                            middleware(req, res, next);
                        } else {
                            next();
                        }
                    } else {
                        next();
                    }
                });
            }
        }
        return this;
    }
    private normalizeRouteInfo(route) {
        let routePath = '';//转化路径
        let routeMethod = RequestMethod.ALL;//默认是支持所有的方法
        if (typeof route === 'string') {
            routePath = route;//传的就是一个路径
        } else if ('path' in route) {
            //如果传入的是一个路径对象，
            routePath = route.path;
            routeMethod = route.method ?? RequestMethod.ALL;
        } else if (route instanceof Function) {
            //如果route是一个控制器的话，以它的路径前缀作为路径
            routePath = Reflect.getMetadata('prefix', route);
        }
        //  cats=>/cats 
        routePath = path.posix.join('/', routePath);
        return { routePath, routeMethod }
    }
    //初始化提供化
    async initProviders() {//重写注册provider的流程
        //获取模块导入的元数据
        const imports = Reflect.getMetadata('imports', this.module) ?? [];
        //遍历所有的导入的模块
        for (const importModule of imports) {//LoggerModule
            let importedModule = importModule;
            //如果导入的是一个Promise，说是它是异步的动态模块
            if (importModule instanceof Promise) {
                importedModule = await importedModule;
            }
            //如果导入的模块有module属性，说明这是一个动态模块
            if ('module' in importedModule) {
                //获取动态模块返回的老的模块定义，新的providers数组，新的导出的token数组
                const { module, providers, controllers, exports } = importedModule;
                //把老的和新的providers和exports进行合并
                const oldControllers = Reflect.getMetadata('controllers', module)
                const newControllers = [...(oldControllers ?? []), ...(controllers ?? [])];
                defineModule(module, newControllers);
                const oldProviders = Reflect.getMetadata('providers', module)
                const newProviders = [...(oldProviders ?? []), ...(providers ?? [])];
                defineModule(module, newProviders);
                const oldExports = Reflect.getMetadata('exports', module)
                const newExports = [...(oldExports ?? []), ...(exports ?? [])];
                Reflect.defineMetadata('controllers', newControllers, module)
                Reflect.defineMetadata('providers', newProviders, module)
                Reflect.defineMetadata('exports', newExports, module)
                this.registerProvidersFromModule(module, this.module);
            } else {
                this.registerProvidersFromModule(importedModule, this.module);
            }
        }
        //获取当前模块提供者的元数据
        const providers = Reflect.getMetadata('providers', this.module) ?? [];
        //遍历并添加每个提供者
        for (const provider of providers) {
            this.addProvider(provider, this.module);
        }
    }
    private registerProvidersFromModule(module, ...parentModules) {
        //获取导入的是不是全局模块
        const global = Reflect.getMetadata('global', module);
        //拿到导入的模块providers进行全量注册
        const importedProviders = Reflect.getMetadata('providers', module) ?? [];
        //1.有可能导入的模块只导出了一部分，并没有全量导出,所以需要使用exports进行过滤 
        const exports = Reflect.getMetadata('exports', module) ?? [];
        //遍历导出exports数组
        for (const exportToken of exports) {
            //2.exports里还可能有module
            if (this.isModule(exportToken)) {
                //要执行递归操作
                this.registerProvidersFromModule(exportToken, module, ...parentModules);
            } else {
                const provider = importedProviders.find(provider => provider === exportToken || provider.provide == exportToken);
                if (provider) {
                    [module, ...parentModules].forEach(module => {
                        this.addProvider(provider, module, global);
                    });
                }
            }
        }
    }
    private isModule(exportToken) {
        return exportToken && exportToken instanceof Function && Reflect.getMetadata('isModule', exportToken);
    }
    //原来的provider都混在一起了，现在需要分开，每个模块有自己的providers
    addProvider(provider, module, global = false) {
        //providers在global为true的情况下就是 this.globalProviders Set
        //providers在global为false的情况下就是module对应的providers Set
        const providers = global ? this.globalProviders : (this.moduleProviers.get(module) || new Set());
        //因为set本身就可以去重，里面只会不同一样的值，两次添加相同的值只添加一次
        if(!global){
            this.moduleProviers.set(module, providers);
        }
        //获取要注册的provider的token
        const injectToken = provider.provide ?? provider;
        //如果实例池里已经有此token对应的实例了
        if (this.providerInstances.has(injectToken)) {
            //则直接把此token放入到providers这个集合直接返回
            if (!providers.has(injectToken)) {
                providers.add(injectToken);
            }
            return;
        }
        //如果有provider的token,并且有useClass属性，说明提供的是一个类，需要实例化
        if (provider.provide && provider.useClass) {
            //获取这个类的定义LoggerService
            const Clazz = provider.useClass;
            //获取此类的参数['suffix']
            const dependencies = this.resolveDependencies(Clazz);
            //创建提供者类的实例
            const value = new Clazz(...dependencies);
            //把提供者的token和实例保存到Map中
            this.providerInstances.set(provider.provide, value);
            providers.add(provider.provide);
            //如果提供的是一个值，则直接放到Map中
        } else if (provider.provide && provider.useValue) {
            this.providerInstances.set(provider.provide, provider.useValue);
            providers.add(provider.provide);
        } else if (provider.provide && provider.useFactory) {
            const inject = provider.inject ?? [];//获取要注入工厂函数的参数  
            //解析出参数的值
            const injectedValues = inject.map(injectToken => this.getProviderByToken(injectToken, module));
            //执行工厂方法，获取返回的值 
            const value = provider.useFactory(...injectedValues);
            //把token和值注册到Map中
            this.providerInstances.set(provider.provide, value);
            providers.add(provider.provide);
        } else {
            //获取此类的参数['suffix']
            const dependencies = this.resolveDependencies(provider);
            //创建提供者类的实例
            const value = new provider(...dependencies);
            //把提供者的token和实例保存到Map中
            this.providerInstances.set(provider, value);
            providers.add(provider);
        }
    }
    use(middleware) {
        this.app.use(middleware);
    }
    private getProviderByToken = (injectedToken, module) => {
        //如何通过token在特定模块下找对应的provider
        //先找到此模块对应的token set,再判断此injectedToken在不在此set中,如果存在， 是可能返回对应的provider实例
        if (this.moduleProviers.get(module)?.has(injectedToken) || this.globalProviders.has(injectedToken)) {
            return this.providerInstances.get(injectedToken);
        } else {
            return null;
        }

    }
    private resolveDependencies(Clazz) {
        //取得注入的token
        const injectedTokens = Reflect.getMetadata(INJECTED_TOKENS, Clazz) ?? [];
        //获取构造函数的参数类型
        const constructorParams = Reflect.getMetadata(DESIGN_PARAMTYPES, Clazz) ?? [];
        return constructorParams.map((param, index) => {
            const module = Reflect.getMetadata('module', Clazz);
            console.log('module',module);
            console.log('token',injectedTokens[index] ?? param);
            //把每个param中的token默认换成对应的provider值
            return this.getProviderByToken(injectedTokens[index] ?? param, module);
        });

    }
    //配置初始化工作
    async init() {
        //取出模块里所有的控制器，然后做好路由配置
        const controllers = Reflect.getMetadata('controllers', this.module) || [];
        Logger.log(`AppModule dependencies initialized`, 'InstanceLoader');
        //路由映射的核心是知道 什么样的请求方法什么样的路径对应的哪个处理函数
        for (const Controller of controllers) {
            //解析出控制器的依赖
            const dependencies = this.resolveDependencies(Controller);
            //创建每个控制器的实例
            const controller = new Controller(...dependencies);
            //获取控制器的路径前缀
            const prefix = Reflect.getMetadata('prefix', Controller) || '/';
            //开始解析路由
            Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver');
            const controllerPrototype = Controller.prototype;
            //获取控制器上绑定的异常过滤器数组
            const controllerFilters = Reflect.getMetadata('filters',Controller)?? [];
            defineModule(this.module,controllerFilters);
            //遍历类的原型上的方法名
            for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
                //获取原型上的方法 index
                const method = controllerPrototype[methodName];
                //取得此函数上绑定的方法名的元数据
                const httpMethod = Reflect.getMetadata('method', method);//GET
                //取得此函数上绑定的路径的元数据
                const pathMetadata = Reflect.getMetadata('path', method);
                const redirectUrl = Reflect.getMetadata('redirectUrl', method);
                const redirectStatusCode = Reflect.getMetadata('redirectStatusCode', method);
                const statusCode = Reflect.getMetadata('statusCode', method);
                const headers = Reflect.getMetadata('headers', method) ?? [];
                //获取方法上绑定的异常过滤器数组
                const methodFilters = Reflect.getMetadata('filters',method)?? [];
                defineModule(this.module,methodFilters);
                //如果方法名不存在，则不处理
                if (!httpMethod) continue;
                //拼出来完整的路由路径
                const routePath = path.posix.join('/', prefix, pathMetadata)
                //配置路由，当客户端以httpMethod方法请求routePath路径的时候，会由对应的函数进行处理
                this.app[httpMethod.toLowerCase()](routePath, async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
                    const host:ArgumentsHost = {//因为Nest不但支持http,还支持graphql 微服务 websocket
                        switchToHttp: () => ({
                            getRequest: () => req,
                            getResponse: () => res,
                            getNext: () => next,
                        })
                    }
                    try {
                        const args = this.resolveParams(controller, methodName, req, res, next,host);
                        //执行路由处理函数，获取返回值
                        const result = await method.call(controller, ...args);
                        if (result?.url) {
                            return res.redirect(result.statusCode || 302, result.url);
                        }
                        //判断如果需要重定向，则直接重定向到指定的redirectUrl
                        if (redirectUrl) {
                            return res.redirect(redirectStatusCode || 302, redirectUrl);
                        }
                        if (statusCode) {
                            res.statusCode = statusCode;
                        } else if (httpMethod === 'POST') {
                            res.statusCode = 201;
                        }
                        //判断controller的methodName方法里有没有使用Response或Res参数装饰器，如果用了任何一个则不发响应
                        const responseMetadata = this.getResponseMetadata(controller, methodName);
                        //或者没有注入Response参数装饰器，或者注入了但是传递了passthrough参数，都会由Nest.js来返回响应
                        if (!responseMetadata || (responseMetadata?.data?.passthrough)) {
                            headers.forEach(({ name, value }) => {
                                res.setHeader(name, value);
                            });
                            //把返回值序列化发回给客户端
                            res.send(result);
                        }
                    } catch (error) {
                        await this.callExceptionFilters(error,host,methodFilters,controllerFilters)
                    }
                })
                Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RoutesResolver');
            }

        }
        Logger.log(`Nest application successfully started`, 'NestApplication');
    }
    getFilterInstance(filter) {
        if (filter instanceof Function) {
            const dependencies = this.resolveDependencies(filter);
            console.log('dependencies',dependencies);
            return new filter(...dependencies);
        }
        return filter;
    }
    private callExceptionFilters(error,host,methodFilters,controllerFilters){
        //按方法过滤器、控制器过滤器、用户配置全局过滤器和默认全局过滤的顺序进行遍历，找到第一个能处理这个错误的过滤器进行处理就可以了
        const allFilters = [...methodFilters,...controllerFilters,...this.globalHttpExceptionFilters,this.defaultGlobalHttpExceptionFilter];
        for(const filter of allFilters){
            let filterInstance = this.getFilterInstance(filter);
            //取出此异常过滤器关心的异步或者说要处理的异常
            const exceptions = Reflect.getMetadata('catch',filterInstance.constructor)??[];
            //如果没有配置catch,或者说当前的错误刚好就是配置的catch的exection的类型或者它的子类
            if(exceptions.length === 0||exceptions.some(exception=>error instanceof exception)){
                filterInstance.catch(error,host)
                break;
            }
        }
    }
    private getResponseMetadata(controller, methodName) {
        const paramsMetaData = Reflect.getMetadata(`params`, controller, methodName) ?? [];
        return paramsMetaData.filter(Boolean).find((param) =>
            param.key === 'Response' || param.key === 'Res' || param.key === 'Next');
    }
    private resolveParams(instance: any, methodName: string, req: ExpressRequest, res: ExpressResponse, next: NextFunction,host) {
        //获取参数的元数据
        const paramsMetaData = Reflect.getMetadata(`params`, instance, methodName) ?? [];
        //[{ parameterIndex: 0, key: 'Req' },{ parameterIndex: 1, key: 'Request' }]
        //此处就是把元数据变成实际的参数
        return paramsMetaData.map((paramMetaData) => {
            const { key, data, factory } = paramMetaData;//{passthrough:true}
            
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
                case "Response":
                case "Res":
                    return res;
                case "Next":
                    return next;
                case "DecoratorFactory":
                    return factory(data, host);
                default:
                    return null;
            }
        })
        //[req,req]
    }
    async initGlobalFilters(){
        //获取当前的模块的所有的providers
        const providers = Reflect.getMetadata('providers',this.module)??[];
        for(const provider of providers){
            if(provider.provide === APP_FILTER){
                const providerInstance = this.getProviderByToken(APP_FILTER,this.module);
                this.useGlobalFilters(providerInstance)
            }
        }
    }
    //启动HTTP服务器
    async listen(port) {
        await this.initProviders();//注入providers
        await this.initMiddlewares();//初始化中间件配置
        await this.initGlobalFilters();//初始化全局的过滤器
        await this.init();
        //调用express实例的listen方法启动一个HTTP服务器，监听port端口
        this.app.listen(port, () => {
            Logger.log(`Application is running on http://localhost:${port}`, 'NestApplication');
        });
    }
}