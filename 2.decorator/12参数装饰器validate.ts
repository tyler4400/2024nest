import 'reflect-metadata'
//用于装饰 类的构造函数或方法的参数
//用来实现在方法调用时验证参数的值
const REQUIRED_PARAMETERS = 'REQUIRED_PARAMETERS'

/**
 * @param target 装饰的目标对象，如果是静态成员，则是类的构造函数，如果是实例成员，则是类的原型对象
 * @param propertyKey 参数所属的方法名称
 * @param parameterIndex 参数在参数列表中的索引 0
 */
function validate(target:any, propertyKey:string, parameterIndex:number){
 const existingRequiredParameters: number[] = Reflect.getOwnMetadata(REQUIRED_PARAMETERS, target, propertyKey)||[];
 existingRequiredParameters.push(parameterIndex);
 Reflect.defineMetadata(REQUIRED_PARAMETERS, existingRequiredParameters, target, propertyKey);
}

function validateParameters(target: any, propertyKey: string, descriptor: PropertyDescriptor){
  const originalMethod = descriptor.value;
  descriptor.value = function(...args:any[]){
    const existingRequiredParameters:number[] = Reflect.getOwnMetadata(REQUIRED_PARAMETERS,target,propertyKey)||[];
    for(let parameterIndex of existingRequiredParameters){
        if(args[parameterIndex]===undefined){
            throw new Error(`Missing required arguments at position ${parameterIndex}`)
        }
    }
    return originalMethod.apply(this,args);
  }
}



class User{
    constructor(private name: string,private age: number){

    }
    @validateParameters
    setName(newName: string, @validate age: number){
        this.name = newName
        this.age = age;
    }
}
const user = new User('Alice',10)
//user.setName('Bob');
user.setName(undefined,undefined);
