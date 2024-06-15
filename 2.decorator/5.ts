//类装饰器扩展类的功能，比如说可以添加新的属性和方法
//{} 表示一个最简单最松散的对象，代表可以有里面没有属性也可能有任意属性
function addTimestamp<T extends {new(...args:any[])}>(constructor:T){
  return class extends constructor{
    timestamp = new Date()
  }
}
interface Document{
    timestamp:Date
}

@addTimestamp
class Document{
    constructor(public title:string){}
}
const doc = new Document('My Document')
console.log(doc.title)
console.log(doc.timestamp)
export {}