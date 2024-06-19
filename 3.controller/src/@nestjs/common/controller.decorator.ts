import 'reflect-metadata';
interface ControllerOptions {
    prefix?: string
}
//其实可能给Controller传递路径路径前缀
//前缀前缀可以为空,也可写成空串，也可以写一个非空字符串，也可能写成一个对象
export function Controller(): ClassDecorator//传空串
export function Controller(prefix: string): ClassDecorator//路径前缀
export function Controller(options: ControllerOptions): ClassDecorator//传递对象
export function Controller(prefixOrOptions?: string | ControllerOptions): ClassDecorator {
    let options: ControllerOptions = {}
    if (typeof prefixOrOptions === 'string') {
        options.prefix = prefixOrOptions
    } else if (typeof prefixOrOptions === 'object') {
        options = prefixOrOptions;
    }
    //这是一个类装饰器，装饰的控制器这个类
    return (target: Function) => {
        //给控制器类添加prefix路径前缀的元数据
        Reflect.defineMetadata('prefix',options.prefix||'',target);
    }
}