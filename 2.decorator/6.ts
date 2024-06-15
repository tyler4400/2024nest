//还可以替换类的构建函数
//可能通过返回一个新的构造函数来替换原有的构造函数
function replaceConstrutor<T extends {new(...args:any[])}>(constructor:T){
    return class extends constructor{
      constructor(...args){
        super(...args);
        console.log('instance created')
      }
    }
  }
  
  @replaceConstrutor
  class User{
      constructor(public name:string){
        console.log('User created')
      }
  }
  const doc = new User('Alice')
  console.log(doc.name)
  export {}