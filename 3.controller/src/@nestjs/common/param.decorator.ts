import 'reflect-metadata';
export const createParamDecorator = (keyOrFactory: String|Function) => {
    //target控制器原型 propertyKey 方法名handleRequest  parameterIndex 先走1再走0
    return (data?:any,...pipes:any[]) => (target: any, propertyKey: string, parameterIndex: number) => {   
        //给控制器类的原型的propertyKey也就是handleRequest方法属性上添加元数据
        //属性名是params:handleRequest 值是一个数组，数组里应该放置数据，表示哪个位置使用啊个装饰器
        const existingParameters = Reflect.getMetadata(`params`,target,propertyKey)??[];
        //从原型的方法属性上获取到参数类型的数组
        const metatype = Reflect.getMetadata('design:paramtypes',target,propertyKey)[parameterIndex];
        if(keyOrFactory instanceof Function){
            //如果传过来的是一个函数的话，存放参数索引，key定死为装饰器工厂，factory就是用来获取值的工厂
            existingParameters[parameterIndex]={parameterIndex,key:'DecoratorFactory',factory:keyOrFactory,data,pipes,metatype};
        }else{
            existingParameters[parameterIndex]={parameterIndex,key:keyOrFactory,data,pipes,metatype};
        }
        Reflect.defineMetadata(`params`,existingParameters,target,propertyKey);
    }
}
export const Request = createParamDecorator('Request');
export const Req = createParamDecorator('Req');
export const Query = createParamDecorator('Query');
export const Headers = createParamDecorator('Headers');
export const Session = createParamDecorator('Session');
export const Ip = createParamDecorator('Ip');
export const Param = createParamDecorator('Param');
export const Body = createParamDecorator('Body');
export const Response = createParamDecorator('Response');
export const Res = createParamDecorator('Res');
export const Next = createParamDecorator('Next');