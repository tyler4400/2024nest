//class-transformer是一个用于在类和普通对象之间进行转换的库，一般和class-validator一起使用
//import {plainToInstance,instanceToPlain} from 'class-transformer';

class User{
    name:string;
    age:number
}
const plainUser = {name:'nick',age:18}
const user = plainToInstance(User,plainUser);
//console.log(new User())
console.log(user instanceof User)

const plainObject = instanceToPlain(user);
console.log(plainObject)
console.log(plainObject instanceof User)

function plainToInstance(Clazz,obj){
  let instance = new Clazz();
  for(let key in obj){
    instance[key]=obj[key]
  }
  return instance;
}
function instanceToPlain(instance){
    return JSON.parse(JSON.stringify(instance));
}