import 'reflect-metadata'
class MyClass{
    private myProperty:string;
    constructor(value:string){
        this.myProperty = value;
    }
    @Reflect.metadata('customKey','customValue')
    myMethod(){
        console.log('Executing myMethod')
    }
}
//MyClass.prototype
//    @Reflect.metadata('customKey','customValue')其实是一个语法糖，可以简化我们对元数据的操作 
//    Reflect.defineMetadata('customKey','customValue',MyClass.prototype,'myMethod');

const instance = new MyClass('hello');
//给instance上的myProperty定义一个元数据，属性是key1,值是value1
Reflect.defineMetadata('key1','value1',instance,'myProperty');
//检查是否具有指定的元数据
const hasMetadata = Reflect.hasMetadata('key1',instance,'myProperty')
console.log(`Has metadata key1 for myProperty:${hasMetadata}`)
//获取元数据
const metadataValue = Reflect.getMetadata('key1',instance,'myProperty')
console.log(` Metadata key1 value for myProperty :${metadataValue}`)
//获取自有元数据（针对方法）
const ownMetaDataValue1 = Reflect.getOwnMetadata('customKey',Reflect.getPrototypeOf(instance),'myMethod');
console.log(`Own metadata customKey value for myMethod ${ownMetaDataValue1}`)
const ownMetaDataValue2 = Reflect.getOwnMetadata('customKey',MyClass.prototype,'myMethod');
console.log(`Own metadata customKey value for myMethod ${ownMetaDataValue2}`)
const ownMetaDataValue3 = Reflect.getMetadata('customKey',instance,'myMethod');
console.log(`Own metadata customKey value for myMethod ${ownMetaDataValue3}`)
//删除元数据
Reflect.deleteMetadata('key1',instance,'myProperty');
const hasMetadataAfterDelete = Reflect.hasMetadata('key1',instance,'myProperty')
console.log(`Has metadata key1 for myProperty after delete:${hasMetadataAfterDelete}`)