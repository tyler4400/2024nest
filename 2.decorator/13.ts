
//不同类型的装饰器的执行顺序
/**
 * 1.属性装饰器、方法装饰器、访问器装饰器它们是按照在类中出现的顺序，从上往下依次执行
 * 2.类装饰器最后执行
 * 3.参数装饰器先于方法执行
 */
function classDecorator1(target){
    console.log('classDecorator1')
}
function classDecorator2(target){
    console.log('classDecorator2')
}
function propertyDecorator1(target,propertyKey){
    console.log('propertyDecorator1')
}
function propertyDecorator2(target,propertyKey){
    console.log('propertyDecorator2')
}
function methodDecorator1(target,propertyKey){
    console.log('methodDecorator1')
}
function methodDecorator2(target,propertyKey){
    console.log('methodDecorator2')
}
function accessorDecorator1(target,propertyKey){
    console.log('accessorDecorator1')
}
function accessorDecorator2(target,propertyKey){
    console.log('accessorDecorator2')
}
function parametorDecorator1(target,propertyKey,parametorIndex:number){
    console.log('parametorDecorator1',propertyKey)//propertyKey方法名
}
function parametorDecorator2(target,propertyKey,parametorIndex:number){
    console.log('parametorDecorator2',propertyKey)//propertyKey方法名
}
@classDecorator1
@classDecorator2
class Example{
   
    @accessorDecorator1
    @accessorDecorator2
    get myProp(){
        return this.prop;
    }
    @propertyDecorator1
    @propertyDecorator2
    prop:string
    @methodDecorator1
    @methodDecorator2
    method(@parametorDecorator1 @parametorDecorator2 params:any){}
}