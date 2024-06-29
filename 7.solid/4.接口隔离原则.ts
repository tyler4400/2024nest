/**
 * 接口隔离原则要求类这间的依赖关系应该建立在最好的接口上
 * 也就是说，不应该强迫一个类依赖于它不使用的方法
 */

/* interface Animal{
    eat():void
    fly():void
}
class Dog implements Animal{
    eat(): void {
        throw new Error("Method not implemented.")
    }
    fly(): void {
        throw new Error("Method not implemented.")
    }
}
 */
interface Eater{
    eat():void
}
interface Flyer{
    fly():void
}
class Dog implements Eater{
    eat(): void {
        console.log('狗狗吃饭')
    }
}
class Bird implements Eater,Flyer{
    eat(): void {
        console.log('狗狗吃饭')
    }
    fly(): void {
        console.log('鸟飞翔')
    }
}
export {}


