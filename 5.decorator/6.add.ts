/**
 * addInitializer
 * 是一个允许在类或类成员完成定义后运行额外的初始化逻辑的函数
 */
function withLogging(value,context){
    console.log('context',context)
  if(context.kind === 'class'){
    context.addInitializer(function(){
        console.log(`initialize ${context.name}`)
    });
  }
}

@withLogging
class MyClass{
    constructor(){
        console.log('constructor')
    }
}
new MyClass();