//根据特定条件完全覆盖一个函数（例如，用于缓存目的）
const cache = new Map()
function cacheResult(target,propertyName,descriptor){
    const originalMethod = descriptor.value;
    descriptor.value = function(...args){
      const cacheKey = JSON.stringify(args);
      if(cache.has(cacheKey)){
        return cache.get(cacheKey);
      }else{
        const result  = originalMethod.apply(this,args);
        cache.set(cacheKey,result);
        return result;
      }
    }
  }
  
  class Example{
      @cacheResult
      calcuate(a:number,b:number){
          console.log('calculating')
          return a+b;
      }
  }
  const example = new Example();
  example.calcuate(1,2)
  example.calcuate(1,2)
  //如果原始方法是异步的话是不是需要等原始方法执行完毕之后才调执行方法之后的逻辑