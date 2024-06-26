import 'reflect-metadata';
function Injectable(target) {
    //这里面可以不用写任何代码，此装饰器不需要执行任何操作，仅仅用于元数据的生成
}
//@Injectable
class Oil {
    constructor(private num: number) {

    }
    start() {
        console.log(`start oil`, this.num)
    }
}
@Injectable
class Engine {
    constructor(private oil: Oil, age: number) {

    }
    start() {
        this.oil.start();
        console.log(`Engine started`)
    }
}
@Injectable
class Car {
    constructor(private engine: Engine) { }
    drive() {
        this.engine.start();
        console.log('Car is runing')
    }
}

//定义一个依赖注入容器类
class DIContainer {
    //定义一个存储所有的服务的Map对象
    private services = new Map<string, any>()
    //注册服务的方法，把服务的名称和实现类保存到Map中
    register<T>(name: string, Service: any) {
        this.services.set(name, Service);
    }
    //解析服务的方法，根据名称返回服务的实例
    resolve<T>(name: string) {
        //获取服务的实现类
        const Service = this.services.get(name);
        if (Service instanceof Function) {//可能是一个类
            //获取实现类的构造函数参数的类型数组
            const dependencies = Reflect.getMetadata('design:paramtypes', Service) ?? [];//[Engine]
            //递归解析所有的依赖项
            const injections = dependencies.map(dependency => this.resolve(dependency.name));
            //创建并返回实现类的实例
            return new Service(...injections);
        } else if (Service.useFactory) {//也可是注册的是一个工厂函数
            const {inject} = Service;
            return Service.useFactory(...inject);
        } else if (Service.useValue) {//也可能就是一直给定的值 
            return Service.useValue;
        }

    }
}
//创建一个依赖注入的容器实例
const container = new DIContainer();
container.register<Oil>('Oil', {
    provide: 'Oil',
    inject: [100],
    useFactory: (number) => {
        return new Oil(number)
    }
});
container.register<Engine>('Engine', {
    provide: 'Engine',
    useValue: new Engine(new Oil(200), 18)
});
container.register<Car>('Car', Car);
const car = container.resolve<Car>('Car');
car.drive();
