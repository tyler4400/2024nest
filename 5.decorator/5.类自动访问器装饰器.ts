//类自动访问器装饰器是一种新的类元素类型
//它在类的字段前添加accessor关键字
//自动访问器自动为字段创建setter和getter方法，并将默认值保上辈子在一个私有的槽中
function logged(value,context){
  console.log(value)
  console.log(context)
  if(context.kind === 'accessor'){
    const {get,set} = value;
    return {
        get(){
            console.log(`getting ${context.name}`)
            return get.call(this)
        },
        set(val){
            console.log(`setting ${context.name} to ${val}`)
            return set.call(this,val)
        },
        init(initialValue){
            console.log(`init ${context.name} to ${initialValue}`)
            return initialValue+1;
        }
    }
  }
}
class Class{
  @logged accessor x = 1
}
const clazz = new Class();
clazz.x;
clazz.x = 123;
export {}
