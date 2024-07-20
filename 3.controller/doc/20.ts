//扩展基本的函数行为

function extendBehavior(target,propertyName,descriptor){
    const originalMethod = descriptor.value;
    descriptor.value = function(...args){
      console.log(`extends....`)
      const result  = originalMethod.apply(this,args);
      return result;
    }
  }
  
  class Example{
      @extendBehavior
      baseMethod(){
          console.log('Executing baseMethod')
      }
  }
  const example = new Example();
  example.baseMethod();
  
  export {}