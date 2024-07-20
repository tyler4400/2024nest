/**
 * RxJS是用来处理异步事件的库
 * Observable 表示一个数据流，可是同步也可以是异步的，它可以发出多个值，它发出值可以由Observer进行订阅
 * Observer是一个对象，定义了回调函数，用于处理Observable发出的数据
 */
import {Observable} from 'rxjs';
const observable = new Observable((subscriber)=>{
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
})
//subscription表示一个对observable的订阅
//通过subscription，可以取消订阅，也可以组合多个订阅
const subscription = observable.subscribe({
    next(x){console.log('x',x)},
    error(err){console.error(err)},
    complete(){console.log('Done')}
});