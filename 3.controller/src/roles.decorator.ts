import 'reflect-metadata'
import { SetMetadata } from "@nestjs/common"

//定义一个名为Roles的函数，该函数接收任意数量的角色名并且反回一个装饰器
export const Roles = (...roles:string[])=>{
 //调用SetMetadata函数，将键roles和角色的数组作为元数据设置目标上
  return SetMetadata('roles',roles);
}

/* 
function decorator(target,propertyKey,descriptor){
   Reflect.defineMetadata('roles',['admin'],descriptor.value);
   Reflect.getMedtadata();
} 
*/