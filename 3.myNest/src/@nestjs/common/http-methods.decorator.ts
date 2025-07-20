import 'reflect-metadata';

const httpMethodFactory = (method: string) => (path: string = ''): MethodDecorator  => {
	/**
	 * target 类原型 AppController.prototype
	 * propertyKey方法键名 index
	 * descriptor index方法的属性描述器
	 */
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor)=> {
		//给descriptor.value，也就是index函数添加元数据，path=path
		Reflect.defineMetadata('path', path, descriptor.value);

		//给descriptor.value，也就是index函数添加元数据，method=GET
		Reflect.defineMetadata('method', method, descriptor.value);
		//descriptor.value.method = 'GET'
	}
}

export const Get = httpMethodFactory('Get')
export const Post = httpMethodFactory('Post')
