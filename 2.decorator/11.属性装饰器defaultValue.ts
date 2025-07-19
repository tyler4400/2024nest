//属性访问控制
//还可以实现用属性装饰器来进行访问控制或者设置初始设置

function defaultValue(value:any){
    return function(target:any, propertyKey:string){
        let val = value;
        const getter = function(){
            return val;
        }
        const setter = function(newValue){
            val = newValue
        }
        //在类的原型上定义了一个属性 // 这个在esnext不生效
        Object.defineProperty(target, propertyKey, {
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
}

const settings = new Settings();
console.log(settings.theme)
console.log('29: .settings: ', settings);

console.log('esnext时，是实例上', Object.getOwnPropertyDescriptor(settings, 'theme'))
console.log('esnext时，原型上', Object.getOwnPropertyDescriptor(Settings, 'theme'))
