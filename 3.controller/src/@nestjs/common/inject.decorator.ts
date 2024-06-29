import 'reflect-metadata';
import {INJECTED_TOKENS} from './'
export function Inject(token:string):ParameterDecorator{
    //target类本身 propertyKey方法的名称 parameterIndex参数的索引
   return (target:Object,propertyKey:string,parameterIndex:number)=>{
    //取出被注入到此类的构建函数中的token数组
    const existingInjectedTokens = Reflect.getMetadata(INJECTED_TOKENS,target)??[];
    //[0,1] [empty,'StringToken']
    existingInjectedTokens[parameterIndex]=token;
    //把token数组保存在target的元数据上
    Reflect.defineMetadata(INJECTED_TOKENS,existingInjectedTokens,target);
   }
}