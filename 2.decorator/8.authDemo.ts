//可以在方法调用前检查 用户的权限，决定是否可以调用
let users = {
    '001':{roles:['admin']},
    '002':{roles:['member']}
}

/**
 *  *
 *  * @param target 装饰的目标对象，如果是静态成员，则是类的构造函数，如果是实例成员，则是类的原型对象
 *  * @param propertyKey 装饰的成员名称
 *  * @param descriptor 成员的属性描述符
 */
function authorize(target:any,propertyKey:string,descriptor:PropertyDescriptor){
  //获取老的函数
   const originalMethod = descriptor.value;
   //重定原型上的属性
   descriptor.value = function(...args:any[]){
      let user = users[args[0]]
      if(user&&user.roles.includes('admin')){
        originalMethod.apply(this,args)
      }else{
        throw new Error(`User is not authorized to call this method`)
      }
   }
   return descriptor;
}

class AdminPanel{
    @authorize
    deleteUser(userId:string){
        console.log(`User ${userId} is deleted`)
    }
}
const adminPanel = new AdminPanel();
adminPanel.deleteUser('002');
