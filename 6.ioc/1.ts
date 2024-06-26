//在没有使用IOC的时候，我们需要直接负责创建依赖的对象
class Engine{
    start(){
        console.log(`Engine started`)
    }
}
class Car{
    private engine:Engine
    constructor(){
        this.engine = new Engine();
    }
    drive(){
        this.engine.start();
        console.log('Car is runing')
    }
}
const car = new Car();
car.drive();