
//方法装饰器
//方法装饰器可以装饰方法
//(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void | PropertyDescriptor。
//1.日志记录 AOP
/**
 *
 * @param target 装饰的目标对象，如果是静态成员，则是类的构造函数，如果是实例成员，则是类的原型对象
 * @param propertyKey 装饰的成员名称
 * @param descriptor 成员的属性描述符
 */
function log(target,propertyKey,descriptor){
  console.log('Method decorator!');
  console.log('12.log.target: ', target);
  console.log('12.log.propertyKey: ', propertyKey);
  console.log('12.log.descriptor: ', descriptor);
    //获取老的函数
   const originalMethod = descriptor.value;
   //重定原型上的属性
   descriptor.value = function(...args:any[]){
    console.log(`Calling ${propertyKey} with arguments:${args}`)
    const result = originalMethod.apply(this,args);
    console.log(`Result:${result}`);
    return result;
   }

}
class Calculator{
    @log
    add(a:number,b:number):number{
        return a+b;
    }
}
const calculator=new Calculator();
calculator.add(1,2)

// 静态方法
class CalculatorStatic{
  @log
  static staticAdd(a:number,b:number):number{
    return a+b;
  }
}
CalculatorStatic.staticAdd(3,5)
