//在方法执行之前/之后绑定额外的逻辑
/**
 * 
 * @param target 类的原型
 * @param propertyName 字符串方法名
 * @param descriptor 属性描述器 descriptor.value就是方法
 */
function logBeforeAndAfter(target,propertyName,descriptor){
  const originalMethod = descriptor.value;
  descriptor.value = function(...args){
    console.log(`Before executing ${propertyName}`)
    const result  = originalMethod.apply(this,args);
    console.log(`After executing ${propertyName}`)
    return result;
  }
}

class Example{
    @logBeforeAndAfter
    someMethod(){
        console.log('Executing someMethod')
    }
}
const example = new Example();
example.someMethod();

export {}