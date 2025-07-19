import 'reflect-metadata'
import { Logger } from "@nest/core";

interface ModuleMetadata {
	controllers: Function[]
}

export function Module(metadata: ModuleMetadata): ClassDecorator{
	return (target: Function): void => {
		Logger.log('给模块类添加元数据，元数据叫controllers', target.constructor.name)
		//给模块类添加元数据 AppModule,元数据的名字叫controllers,值是controllers数组[AppController]
		Reflect.defineMetadata('controllers', metadata.controllers, target);
	}
}
