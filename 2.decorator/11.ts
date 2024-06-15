//属性访问控制
//还可以实现用属性装饰器来进行访问控制或者设置初始设置

function defaultValue(value:any){
    return function(target:any,propertyKey:string){
        let val = value;
        const getter = function(){
            return val;
        }
        const setter = function(newValue){
            val = newValue
        }
        Object.defineProperty(target,propertyKey,{
            enumerable:true,
            configurable:true,
            get:getter,
            set:setter
        });
    }
}

class Settings{
    @defaultValue('dark')
    theme:string
    @defaultValue(30)
    timeout:number
}

const settings = new Settings();
console.log(settings.theme)
console.log(settings.timeout)