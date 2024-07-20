import 'reflect-metadata';
export function SetMetadata(metadataKey,metadataValue){
        //返回一个装饰器函数
        return (target:object|Function,propertyKey?:string,descriptor?)=>{
            //如果有属性描述器，装饰的是方法
            if(descriptor){
                Reflect.defineMetadata(metadataKey,metadataValue,descriptor.value);//descriptor.value=async index
            }else{
                Reflect.defineMetadata(metadataKey,metadataValue,target);
            }
         }
}