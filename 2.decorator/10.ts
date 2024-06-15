import 'reflect-metadata'
//访问器装饰器会是用来装饰访问器的 get set
//属性装饰器 用来装饰类的属性  (target:object,propertyKey:string|symbol)=>void
//元数据添加 实现参数校验
/**
 * 
 * @param target 装饰的目标对象，对于静态属性来说就是类的构造函数，对于实例属性来说就是类的原型对象
 * @param propertyKey 装饰的属性名称
 */
function required(target:any,propertyKey:string){
  console.log('target === User.prototype',target === User.prototype)
    //添加元数据，就是给类的原型对象的username属性上添加元数据required:true
   Reflect.defineMetadata('required',true,target,propertyKey)
}
function validate(user:User){
  for(let key in user){
    //如果此属性标识为必填了，但是值却是空的
    //上面添的添加类的原型上了，此处通过实例取没问题，因为会找原型链
    if(Reflect.getMetadata('required',user,key) && !user[key]){
        throw new Error(`Property ${key} is required`)
    }
  }
}
class User{
    @required
    username:string
}

const user = new User();
user.username = '0';
validate(user);