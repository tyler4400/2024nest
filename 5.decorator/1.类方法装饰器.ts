
type ClassMethodDecorator = (value: Function, context: {
    kind: 'method',//被装饰的值的类型,可以是class method getter setter field accessor(没学) 之一
    name: string,//表示被装饰的值的名称
    static: boolean,//表示指示值是否静态属性
    private: boolean,//表示值是否是私有的类元素
}) => Function | void

function logged(value, context) {
    console.log('value', value)
    console.log('context', context)
    if (context.kind === 'method') {//说明这是一个类的方法装饰器
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
    sum(a, b) {
        return a + b;
    }
}
const result = new Class().sum(1, 2);
console.log(result)