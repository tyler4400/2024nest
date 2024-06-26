/**
 * 在TS里在，emitDecoratorMetadata 生成元数据主要有以下三种
 * design:type 用于属性的类型元数据
 * design:paramtypes 用于构建函数或方法参数的类型元数据
 * design:returntype 用于方法的返回类型元数据
 * 在vscode里写代码的时候，关于ts的处理分为
 * tsServer和ts compiler
 * 语法检查用的是tsServer
 * 把ts编译成js用的是compiler
 */
import 'reflect-metadata'
//The runtime will invoke the decorator with 2 arguments, but the decorator expects 1.
function classDecorator(target){

}
function paramDecorator(target,propertyKey,parameterIndex){

}
function propDecorator(target,propertyKey){

}
function methodDecorator(target,propertyKey,descriptor){

}
@classDecorator
class ExampleClass{
    @propDecorator
    myProperty:number
    constructor(@paramDecorator serviceA:string,@paramDecorator serviceB:string){

    }
    @methodDecorator
    myMethod(@paramDecorator a:number,@paramDecorator b:number):string{
        return 'hello'
    }
}
//获取属性的类型
const propertyType = Reflect.getMetadata('design:type',ExampleClass.prototype,'myProperty');
console.log('propertyType',propertyType);//propertyType [Function: String] propertyType [Function: Number]
const paramTypes = Reflect.getMetadata('design:paramtypes',ExampleClass);
console.log('ExampleClass.paramTypes',paramTypes)
const myMethodParamTypes = Reflect.getMetadata('design:paramtypes',ExampleClass.prototype,'myMethod');
console.log('myMethodParamTypes',myMethodParamTypes)
const returnType = Reflect.getMetadata('design:returntype',ExampleClass.prototype,'myMethod')
console.log('returnType',returnType)
const myMethodtype = Reflect.getMetadata('design:type',ExampleClass.prototype,'myMethod');
console.log('myMethodtype',myMethodtype);//myMethodtype [Function: Function]

