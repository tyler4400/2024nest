import 'reflect-metadata'
function log(value,context){
}

@log
class Person{
 //@Reflect.metadata('metadataKey', 'metadataValue')
  getName(){

  }
}
let p = new Person();
console.log(p)