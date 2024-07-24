"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestApplication = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const constants_2 = require("../common/constants");
const module_decorator_1 = require("../common/module.decorator");
const http_exception_filter_1 = require("../common/http-exception.filter");
const reflector_1 = require("./reflector");
class NestApplication {
    constructor(module) {
        this.module = module;
        this.app = (0, express_1.default)();
        this.providerInstances = new Map();
        this.globalProviders = new Set();
        this.moduleProviers = new Map();
        this.middlewares = [];
        this.excludedRoutes = [];
        this.defaultGlobalHttpExceptionFilter = new http_exception_filter_1.GlobalHttpExectionFilter();
        this.globalHttpExceptionFilters = [];
        this.globalPipes = [];
        this.globalGuards = [];
        this.getProviderByToken = (injectedToken, module) => {
            if (this.moduleProviers.get(module)?.has(injectedToken) || this.globalProviders.has(injectedToken)) {
                return this.providerInstances.get(injectedToken);
            }
            else {
                return null;
            }
        };
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    useGlobalPipes(...pipes) {
        this.globalPipes.push(...pipes);
    }
    useGlobalFilters(...filters) {
        (0, module_decorator_1.defineModule)(this.module, filters.filter(filter => filter instanceof Function));
        this.globalHttpExceptionFilters.push(...filters);
    }
    exclude(...routeInfos) {
        this.excludedRoutes.push(...routeInfos.map(this.normalizeRouteInfo));
        return this;
    }
    initMiddlewares() {
        this.module.prototype.configure?.(this);
    }
    apply(...middleware) {
        (0, module_decorator_1.defineModule)(this.module, middleware);
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
    isExcluded(reqPath, method) {
        return this.excludedRoutes.some(routeInfo => {
            const { routePath, routeMethod } = routeInfo;
            return routePath === reqPath && (routeMethod === common_1.RequestMethod.ALL || routeMethod === method);
        });
    }
    forRoutes(...routes) {
        for (const route of routes) {
            for (const middleware of this.middlewares) {
                const { routePath, routeMethod } = this.normalizeRouteInfo(route);
                this.app.use(routePath, (req, res, next) => {
                    if (this.isExcluded(req.originalUrl, req.method)) {
                        return next();
                    }
                    if (routeMethod === common_1.RequestMethod.ALL || routeMethod === req.method) {
                        if ('use' in middleware.prototype || 'use' in middleware) {
                            const middlewareInstance = this.getMiddelwareInstance(middleware);
                            middlewareInstance.use(req, res, next);
                        }
                        else if (middleware instanceof Function) {
                            middleware(req, res, next);
                        }
                        else {
                            next();
                        }
                    }
                    else {
                        next();
                    }
                });
            }
        }
        this.middlewares.length = 0;
        return this;
    }
    normalizeRouteInfo(route) {
        let routePath = '';
        let routeMethod = common_1.RequestMethod.ALL;
        if (typeof route === 'string') {
            routePath = route;
        }
        else if ('path' in route) {
            routePath = route.path;
            routeMethod = route.method ?? common_1.RequestMethod.ALL;
        }
        else if (route instanceof Function) {
            routePath = Reflect.getMetadata('prefix', route);
        }
        routePath = path_1.default.posix.join('/', routePath);
        return { routePath, routeMethod };
    }
    addDefaultProviders() {
        this.addProvider(reflector_1.Reflector, this.module, true);
    }
    async initProviders() {
        this.addDefaultProviders();
        const imports = Reflect.getMetadata('imports', this.module) ?? [];
        for (const importModule of imports) {
            let importedModule = importModule;
            if (importModule instanceof Promise) {
                importedModule = await importedModule;
            }
            if ('module' in importedModule) {
                const { module, providers, controllers, exports } = importedModule;
                const oldControllers = Reflect.getMetadata('controllers', module);
                const newControllers = [...(oldControllers ?? []), ...(controllers ?? [])];
                (0, module_decorator_1.defineModule)(module, newControllers);
                const oldProviders = Reflect.getMetadata('providers', module);
                const newProviders = [...(oldProviders ?? []), ...(providers ?? [])];
                (0, module_decorator_1.defineModule)(module, newProviders);
                const oldExports = Reflect.getMetadata('exports', module);
                const newExports = [...(oldExports ?? []), ...(exports ?? [])];
                Reflect.defineMetadata('controllers', newControllers, module);
                Reflect.defineMetadata('providers', newProviders, module);
                Reflect.defineMetadata('exports', newExports, module);
                this.registerProvidersFromModule(module, this.module);
            }
            else {
                this.registerProvidersFromModule(importedModule, this.module);
            }
        }
        const providers = Reflect.getMetadata('providers', this.module) ?? [];
        for (const provider of providers) {
            this.addProvider(provider, this.module);
        }
    }
    registerProvidersFromModule(module, ...parentModules) {
        const global = Reflect.getMetadata('global', module);
        const importedProviders = Reflect.getMetadata('providers', module) ?? [];
        const exports = Reflect.getMetadata('exports', module) ?? [];
        for (const exportToken of exports) {
            if (this.isModule(exportToken)) {
                this.registerProvidersFromModule(exportToken, module, ...parentModules);
            }
            else {
                const provider = importedProviders.find(provider => provider === exportToken || provider.provide == exportToken);
                if (provider) {
                    [module, ...parentModules].forEach(module => {
                        this.addProvider(provider, module, global);
                    });
                }
            }
        }
        this.initController(module);
    }
    isModule(exportToken) {
        return exportToken && exportToken instanceof Function && Reflect.getMetadata('isModule', exportToken);
    }
    addProvider(provider, module, global = false) {
        const providers = global ? this.globalProviders : (this.moduleProviers.get(module) || new Set());
        if (!global) {
            this.moduleProviers.set(module, providers);
        }
        const injectToken = provider.provide ?? provider;
        if (this.providerInstances.has(injectToken)) {
            if (!providers.has(injectToken)) {
                providers.add(injectToken);
            }
            return;
        }
        if (provider.provide && provider.useClass) {
            const Clazz = provider.useClass;
            const dependencies = this.resolveDependencies(Clazz);
            const value = new Clazz(...dependencies);
            this.providerInstances.set(provider.provide, value);
            providers.add(provider.provide);
        }
        else if (provider.provide && provider.useValue) {
            this.providerInstances.set(provider.provide, provider.useValue);
            providers.add(provider.provide);
        }
        else if (provider.provide && provider.useFactory) {
            const inject = provider.inject ?? [];
            const injectedValues = inject.map(injectToken => this.getProviderByToken(injectToken, module));
            const value = provider.useFactory(...injectedValues);
            this.providerInstances.set(provider.provide, value);
            providers.add(provider.provide);
        }
        else {
            const dependencies = this.resolveDependencies(provider);
            const value = new provider(...dependencies);
            this.providerInstances.set(provider, value);
            providers.add(provider);
        }
    }
    use(middleware) {
        this.app.use(middleware);
    }
    resolveDependencies(Clazz) {
        const injectedTokens = Reflect.getMetadata(constants_2.INJECTED_TOKENS, Clazz) ?? [];
        const constructorParams = Reflect.getMetadata(constants_2.DESIGN_PARAMTYPES, Clazz) ?? [];
        return constructorParams.map((param, index) => {
            const module = Reflect.getMetadata('module', Clazz);
            return this.getProviderByToken(injectedTokens[index] ?? param, module);
        });
    }
    getGuardInstance(guard) {
        if (typeof guard === 'function') {
            const dependencies = this.resolveDependencies(guard);
            return new guard(...dependencies);
        }
        return guard;
    }
    async callGuards(guards, context) {
        for (const guard of guards) {
            const guardInstance = this.getGuardInstance(guard);
            const canActivate = await guardInstance.canActivate(context);
            if (!canActivate) {
                throw new common_1.ForbiddenException(constants_1.FORBODDEN_RESOURCE);
            }
        }
    }
    callInterceptors(controller, method, args, interceptors, context, host, pipes) {
    }
    async initController(module) {
        const controllers = Reflect.getMetadata('controllers', module) || [];
        logger_1.Logger.log(`AppModule dependencies initialized`, 'InstanceLoader');
        for (const Controller of controllers) {
            const dependencies = this.resolveDependencies(Controller);
            const controller = new Controller(...dependencies);
            const prefix = Reflect.getMetadata('prefix', Controller) || '/';
            logger_1.Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver');
            const controllerPrototype = Controller.prototype;
            const controllerFilters = Reflect.getMetadata('filters', Controller) ?? [];
            const controllerPipes = Reflect.getMetadata('pipes', Controller) ?? [];
            const controllerGuards = Reflect.getMetadata('guards', Controller) ?? [];
            const controllerInterceptors = Reflect.getMetadata('interceptors', Controller) ?? [];
            (0, module_decorator_1.defineModule)(this.module, controllerFilters);
            for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
                const method = controllerPrototype[methodName];
                const httpMethod = Reflect.getMetadata('method', method);
                const pathMetadata = Reflect.getMetadata('path', method);
                const redirectUrl = Reflect.getMetadata('redirectUrl', method);
                const redirectStatusCode = Reflect.getMetadata('redirectStatusCode', method);
                const statusCode = Reflect.getMetadata('statusCode', method);
                const headers = Reflect.getMetadata('headers', method) ?? [];
                const methodFilters = Reflect.getMetadata('filters', method) ?? [];
                const methodPipes = Reflect.getMetadata('pipes', method) ?? [];
                const methodGuards = Reflect.getMetadata('guards', method) ?? [];
                const methodInterceptors = Reflect.getMetadata('interceptors', method) ?? [];
                const pipes = [...controllerPipes, ...methodPipes];
                const guards = [...this.globalGuards, ...controllerGuards, ...methodGuards];
                const interceptors = [...controllerInterceptors, ...methodInterceptors];
                (0, module_decorator_1.defineModule)(this.module, methodFilters);
                if (!httpMethod)
                    continue;
                const routePath = path_1.default.posix.join('/', prefix, pathMetadata);
                this.app[httpMethod.toLowerCase()](routePath, async (req, res, next) => {
                    const host = {
                        switchToHttp: () => ({
                            getRequest: () => req,
                            getResponse: () => res,
                            getNext: () => next,
                        })
                    };
                    const context = {
                        ...host,
                        getClass: () => Controller,
                        getHandler: () => method
                    };
                    try {
                        await this.callGuards(guards, context);
                        const args = await this.resolveParams(controller, methodName, context, host, pipes);
                        this.callInterceptors(controller, method, args, interceptors, context, host, pipes);
                        const result = await method.call(controller, ...args);
                        if (result?.url) {
                            return res.redirect(result.statusCode || 302, result.url);
                        }
                        if (redirectUrl) {
                            return res.redirect(redirectStatusCode || 302, redirectUrl);
                        }
                        if (statusCode) {
                            res.statusCode = statusCode;
                        }
                        else if (httpMethod === 'POST') {
                            res.statusCode = 201;
                        }
                        const responseMetadata = this.getResponseMetadata(controller, methodName);
                        if (!responseMetadata || (responseMetadata?.data?.passthrough)) {
                            headers.forEach(({ name, value }) => {
                                res.setHeader(name, value);
                            });
                            res.send(result);
                        }
                    }
                    catch (error) {
                        await this.callExceptionFilters(error, host, methodFilters, controllerFilters);
                    }
                });
                logger_1.Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RoutesResolver');
            }
        }
        logger_1.Logger.log(`Nest application successfully started`, 'NestApplication');
    }
    getFilterInstance(filter) {
        if (filter instanceof Function) {
            const dependencies = this.resolveDependencies(filter);
            console.log('dependencies', dependencies);
            return new filter(...dependencies);
        }
        return filter;
    }
    callExceptionFilters(error, host, methodFilters, controllerFilters) {
        const allFilters = [...methodFilters, ...controllerFilters, ...this.globalHttpExceptionFilters, this.defaultGlobalHttpExceptionFilter];
        for (const filter of allFilters) {
            let filterInstance = this.getFilterInstance(filter);
            const exceptions = Reflect.getMetadata('catch', filterInstance.constructor) ?? [];
            if (exceptions.length === 0 || exceptions.some(exception => error instanceof exception)) {
                filterInstance.catch(error, host);
                break;
            }
        }
    }
    getResponseMetadata(controller, methodName) {
        const paramsMetaData = Reflect.getMetadata(`params`, controller, methodName) ?? [];
        return paramsMetaData.filter(Boolean).find((param) => param.key === 'Response' || param.key === 'Res' || param.key === 'Next');
    }
    async resolveParams(instance, methodName, context, host, pipes) {
        const { getRequest, getResponse, getNext } = context.switchToHttp();
        const req = getRequest();
        const res = getResponse();
        const next = getNext();
        const paramsMetaData = Reflect.getMetadata(`params`, instance, methodName) ?? [];
        return Promise.all(paramsMetaData.map(async (paramMetaData) => {
            const { key, data, factory, pipes: paramPipes, metatype } = paramMetaData;
            let value;
            switch (key) {
                case "Request":
                case "Req":
                    value = req;
                    break;
                case "Query":
                    value = data ? req.query[data] : req.query;
                    break;
                case "Headers":
                    value = data ? req.headers[data] : req.headers;
                    break;
                case 'Session':
                    value = data ? req.session[data] : req.session;
                    break;
                case 'Ip':
                    value = req.ip;
                    break;
                case 'Param':
                    value = data ? req.params[data] : req.params;
                    break;
                case 'Body':
                    value = data ? req.body[data] : req.body;
                    break;
                case "Response":
                case "Res":
                    value = res;
                    break;
                case "Next":
                    value = next;
                    break;
                case constants_1.DECORATOR_FACTORY:
                    value = factory(data, host);
                    break;
                default:
                    value = null;
                    break;
            }
            for (const pipe of [...this.globalPipes, ...pipes, ...paramPipes]) {
                const pipeInstance = this.getPipeInstance(pipe);
                const type = key === constants_1.DECORATOR_FACTORY ? 'custom' : key.toLowerCase();
                value = await pipeInstance.transform(value, { type, data, metatype });
            }
            return value;
        }));
    }
    getPipeInstance(pipe) {
        if (typeof pipe === 'function') {
            const dependencies = this.resolveDependencies(pipe);
            return new pipe(...dependencies);
        }
        return pipe;
    }
    async initGlobalFilters() {
        const providers = Reflect.getMetadata('providers', this.module) ?? [];
        for (const provider of providers) {
            if (provider.provide === constants_1.APP_FILTER) {
                const providerInstance = this.getProviderByToken(constants_1.APP_FILTER, this.module);
                this.useGlobalFilters(providerInstance);
            }
        }
    }
    initGlobalPipes() {
        const providers = Reflect.getMetadata('providers', this.module) ?? [];
        for (const provider of providers) {
            if (provider.provide === constants_1.APP_PIPE) {
                const providerInstance = this.getProviderByToken(constants_1.APP_PIPE, this.module);
                this.useGlobalPipes(providerInstance);
            }
        }
    }
    initGlobalGuards() {
        const providers = Reflect.getMetadata('providers', this.module) ?? [];
        for (const provider of providers) {
            if (provider.provide === constants_1.APP_GUARD) {
                const providerInstance = this.getProviderByToken(constants_1.APP_GUARD, this.module);
                this.useGlobalGuards(providerInstance);
            }
        }
    }
    useGlobalGuards(...guards) {
        this.globalGuards.push(...guards);
    }
    async listen(port) {
        await this.initProviders();
        await this.initMiddlewares();
        await this.initGlobalFilters();
        await this.initGlobalPipes();
        await this.initGlobalGuards();
        await this.initController(this.module);
        this.app.listen(port, () => {
            logger_1.Logger.log(`Application is running on http://localhost:${port}`, 'NestApplication');
        });
    }
}
exports.NestApplication = NestApplication;
//# sourceMappingURL=nest-application.js.map