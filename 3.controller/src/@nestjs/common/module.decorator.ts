import 'reflect-metadata';
//模块的元数据
interface ModuleMetadata{
  controllers?:Function[];
  providers?:any[]
}
//定义模块装饰器
export function Module(metadata:ModuleMetadata):ClassDecorator{
    return (target:Function)=>{
      //给模块类添加元数据 AppModule,元数据的名字叫controllers,值是controllers数组[AppController]
      //给模块类AppModule添加元数据 providers，值是[LoggerService]
      Reflect.defineMetadata('controllers',metadata.controllers,target);
      //在类上保存了一个providers的数组，表示给此模块注入的providers供应者
      Reflect.defineMetadata('providers',metadata.providers,target);
    }
}