import 'reflect-metadata';
export function UseInterceptors(...interceptors){
  return (target,propertyKey,descriptor)=>{
   
    if(descriptor){
        const existingInterceptors = Reflect.getMetadata('interceptors',descriptor.value)??[];
        Reflect.defineMetadata('interceptors',[...existingInterceptors,...interceptors],descriptor.value);
    }else{
        const existingInterceptors = Reflect.getMetadata('interceptors',descriptor.valutarget)??[];
        Reflect.defineMetadata('interceptors',[...existingInterceptors,...interceptors],target);
    }
  }
}