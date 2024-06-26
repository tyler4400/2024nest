
function logged(value, context) {
    //console.log('value', value)
    //console.log('context', context)
     if (context.kind === 'getter'||context.kind === 'setter') {
        return function (...args) {
            console.log(`starting ${context.name} with arguments ${args.join(',')}`)
            const result = value.call(this, ...args);
            console.log(`ending ${context.name}`);
            return result;
        }
    } 
}
class Class {
    @logged
    set x(args){}
    @logged
    get x(){return 2}
}
let clazz = new Class();
clazz.x = 1;
console.log(clazz.x)

export {}