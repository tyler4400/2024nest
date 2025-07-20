import 'reflect-metadata';

export const createParamDecorator = (key: string) => {
	//target控制器原型 propertyKey 方法名handleRequest  parameterIndex 先走1再走0
	return (data?: any) => (target: any, propertyKey: string, parameterIndex: number) => {
		//给控制器类的原型的propertyKey也就是handleRequest方法属性上添加元数据
		//属性名是params:handleRequest 值是一个数组，数组里应该放置数据，表示哪个位置使用啊个装饰器
		const existingParameters: ExistingParam[] = Reflect.getMetadata(`params`, target, propertyKey)||[];
		existingParameters[parameterIndex] = ({ parameterIndex, key, data });
		//existingParameters[parameterIndex]=key;
		//[{ parameterIndex: 1, key: 'Request' },{ parameterIndex: 0, key: 'Req' }]
		console.log('existingParameters', existingParameters, target, propertyKey, parameterIndex);
		Reflect.defineMetadata(`params`, existingParameters, target, propertyKey);
	}
}
export const Request = createParamDecorator('Request');
export const Req = createParamDecorator('Req');
export const Query = createParamDecorator('Query');
export const Headers = createParamDecorator('Headers');
export const Session = createParamDecorator('Session');
export const Ip = createParamDecorator('Ip');
export const Param = createParamDecorator('Param');

export interface ExistingParam {
	key: string
	parameterIndex: number
	data?: any
}
