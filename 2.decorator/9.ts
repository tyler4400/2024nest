//方法装饰器可以实现缓存结果

function cache(target:any,propertyKey:string,descriptor:PropertyDescriptor){
   const originalMethod = descriptor.value;
   const cacheMap = new Map<string,any>()
   descriptor.value = function(...args:any[]){
        const key = JSON.stringify(args);
        if(cacheMap.has(key)){
            return cacheMap.get(key)
        }
        const result = originalMethod.apply(this,args);
        console.log('originalMethod',args)
        cacheMap.set(key,result);
        return result;
   }
   return descriptor;
}

class MathOperations{
    @cache
    factorial(n:number):number{
        if(n<=1) return 1;
        return n* this.factorial(n-1);
    }
}
const mathOperations = new MathOperations();
console.log(mathOperations.factorial(5))
console.log(mathOperations.factorial(5))