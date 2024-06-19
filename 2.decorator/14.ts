function defaultValue(defaults:{[key:string]:any}){
    return function<T extends {new (...args:any[]):{}}>(construtor:T){
       return class extends construtor{
            constructor(...args){
                super(...args);
                Object.keys(defaults).forEach(key=>{
                    if(this[key] === undefined){
                        this[key]=defaults[key]
                    }
                })
            }
       }
    }
}

@defaultValue({
    theme:"dark"
})
class Settings{
    theme:string
}
let s = new Settings();
console.log(s.theme)
export {}

const settings = new Settings();
console.log(settings.theme)