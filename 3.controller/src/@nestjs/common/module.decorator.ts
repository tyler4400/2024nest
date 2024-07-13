import 'reflect-metadata';
//模块的元数据
interface ModuleMetadata{
  controllers?:Function[];
  providers?:any[];
  exports?:any[];//模块的导出 可以把自己的一部分providers导出给别的模块的，别的模块只要导入了自己这个模块，
  imports?:any[];//导入的模块 可以导入别的模块，把别的模块的导出的providers给自己用
}
//定义模块装饰器
export function Module(metadata:ModuleMetadata):ClassDecorator{
    return (target:Function)=>{
      //当一个类使用Module装饰器的时候就可以添加标识它是一个模块的元数据
      Reflect.defineMetadata('isModule',true,target);
      //给模块类添加元数据 AppModule,元数据的名字叫controllers,值是controllers数组[AppController]
      //给模块类AppModule添加元数据 providers，值是[LoggerService]
      //就是把控制器的类和提供者的类和对应的模块进行了关联
      //我得知道此控制器属于哪个模块
      defineModule(target,metadata.controllers);
      Reflect.defineMetadata('controllers',metadata.controllers,target);
       //我得知道此providers属于哪个模块 其实这行代码我们尚未使用 target就是module
      defineModule(target,
        (metadata.providers??[]).map(provider=>provider instanceof Function?provider:provider.useClass)
        .filter(Boolean));
      Reflect.defineMetadata('providers',metadata.providers,target);
      //在类上保存exports
      Reflect.defineMetadata('exports',metadata.exports,target);
      //在类上保存imports
      Reflect.defineMetadata('imports',metadata.imports,target);
    }
}

export function defineModule(nestModule,targets=[]){
  //遍历targets数组，为每个元素添加元数据，key是nestModule,值是对应的模块
  targets.forEach(target=>{
    Reflect.defineMetadata('module',nestModule,target);
  })
}
export function Global(){
  return (target:Function)=>{
    Reflect.defineMetadata('global',true,target);
  }
}

export interface DynamicModule extends ModuleMetadata{
  module:Function
}