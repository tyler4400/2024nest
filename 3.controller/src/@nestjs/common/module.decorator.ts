import 'reflect-metadata';
//模块的元数据
interface ModuleMetadata{
  controllers:Function[]
}
//定义模块装饰器
export function Module(metadata:ModuleMetadata):ClassDecorator{
    return (target:Function)=>{
      //给模块类添加元数据 AppModule,元数据的名字叫controllers,值是controllers数组[AppController]
      Reflect.defineMetadata('controllers',metadata.controllers,target);
    }
}