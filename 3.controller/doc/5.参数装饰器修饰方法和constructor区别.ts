

export function Inject1(): ParameterDecorator {
    return (target: Function, propertyKey: string, parameterIndex: number) => {
        console.log('Inject1', target)
        //说明target是类本身
    }
}
export function Inject2(): ParameterDecorator {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        //Inject2 {} target是Person类的原型
        console.log('Inject2', target)
    }
}
class Person {
    constructor(@Inject1() a: number) {

    }
    method(@Inject2() b: number) {

    }
}