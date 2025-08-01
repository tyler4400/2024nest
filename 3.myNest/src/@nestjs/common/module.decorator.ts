import 'reflect-metadata'
import { Logger } from "@nest/core";

interface ModuleMetadata {
	controllers?: Function[],
	providers?: any[],
	// 模块的导出 可以把自己的一部分providers导出给别的模块的，别的模块只要导入了自己这个模块，
	exports?: any[];
	//导入的模块 可以导入别的模块，把别的模块的导出的providers给自己用
	imports?: any[];
}

export function Module(metadata: ModuleMetadata): ClassDecorator{
	return (target: Function): void => {

		//当一个类使用Module装饰器的时候就可以添加标识它是一个模块的元数据
		Reflect.defineMetadata('isModule', true, target);

		//给模块类添加元数据 AppModule,元数据的名字叫controllers,值是controllers数组[AppController]
		Reflect.defineMetadata('controllers', metadata.controllers, target);

		//给类AppModule上添加元数据 providers，值是[LoggerService]
		//在类上保存了一个providers的数组，表示给此模块注入的providers供应者
		Reflect.defineMetadata('providers', metadata.providers, target)

		//在类上保存exports
		Reflect.defineMetadata('exports', metadata.exports, target);
		//在类上保存imports
		Reflect.defineMetadata('imports', metadata.imports, target);
	}
}
