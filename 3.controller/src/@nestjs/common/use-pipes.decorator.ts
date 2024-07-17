import 'reflect-metadata';
import { PipeTransform } from './pipe-transform.interface';
export function UsePipes(...pipes:PipeTransform[]){
 return (
    target:object|Function,propertyKey?:string,descriptor?:TypedPropertyDescriptor<any>)=>{
        if(descriptor){//如果是装饰方法，则给方法添加元数据pipes
            Reflect.defineMetadata('pipes',pipes,descriptor.value);
        }else{//如果装饰的是类，给类添加元数据pipes
            Reflect.defineMetadata('pipes',pipes,target);
        }
 }
}