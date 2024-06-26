
import 'reflect-metadata';
function Injectable(target) {
    //这里面可以不用写任何代码，此装饰器不需要执行任何操作，仅仅用于元数据的生成
}
//@Injectable
class Oil {
    constructor(private num: number) {

    }
}

const dependencies = Reflect.getMetadata('design:paramtypes', Oil)
console.log(dependencies)