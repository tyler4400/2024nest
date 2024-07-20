import 'reflect-metadata';

//定义一个装饰器工厂函数，可以返回方法和类的装饰器
//参数就是守卫
export function UseGuards(...guards){
    //返回一个装饰器函数
     return (target:object|Function,propertyKey?:string,descriptor?)=>{
        //如果有属性描述器，装饰的是方法
        if(descriptor){
            Reflect.defineMetadata('guards',guards,descriptor.value);//descriptor.value=async index
        }else{
            Reflect.defineMetadata('guards',guards,target);
        }
     }
}