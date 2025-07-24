import 'reflect-metadata';
export function Injectable(): ClassDecorator{
	return function(target: Function){
		//给类的定义添加一个元数据，数据名称为injectable,值为true
		Reflect.defineMetadata('injectable', true, target)
		/**
		 * 除了上面手动注入的元数据
		 * TypeScript编译器会自动为被装饰器装饰的类生成元数据，包括：
		 * design:type - 属性的类型元数据
		 * design:paramtypes - 构造函数参数的类型元数据
		 * design:returntype - 方法返回值的类型元数据
		 * 2. @Injectable的作用
		 * @Injectable装饰器的作用不是注册元数据，而是：
		 * 触发TypeScript编译器生成元数据：只有被装饰器装饰的类，编译器才会生成类型元数据
		 */
	}
}
