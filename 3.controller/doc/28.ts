//from也是一个创建可观察对象的函数，它可以接受各种可迭代对象(数组、Promise,迭代器),并把它们转化为可观察对象
class Observable {
    constructor(private _subscribe) { }
    //订阅方法，接受一个观察者对象
    subscribe(observer) {
        //调用存储的订阅函数，并传入观察者对象
        return this._subscribe(observer)
    }
}
//定义一个from函数
function from(input) {
    return new Observable((observer) => {
        if (input instanceof Promise) {
            input.then(value=>{
                observer.next(value);
                observer.complete();
            },error=>{
                observer.error(error);
            })
            //.finally{
            //    observer.complete();
            //}
        } else {
            for (let value of input) {
                observer.next(value);
            }
            observer.complete();
        }
    });
}
from([1, 2, 3]).subscribe({
    next: value => console.log(value),
    error: console.error,
    complete: () => console.log('completed')
});

from(Promise.reject('error')).subscribe({
    next: value => console.log(value),
    error: console.error,
    complete: () => console.log('completed')
});

export { }