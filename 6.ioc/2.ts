//构造函数注入
class Engine{
    start(){
        console.log(`Engine started`)
    }
}
class Car{
    private engine:Engine
    constructor(engine:Engine){
        this.engine =engine
    }
    drive(){
        this.engine.start();
        console.log('Car is runing')
    }
}
const engine = new Engine();
const car = new Car(engine);
car.drive();
export {}