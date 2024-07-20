import {of,from,throwError} from 'rxjs';
import {tap,map,catchError, timeout,delay} from 'rxjs/operators';
//创建操作符 用来创建Observable的操作符
//of是一个创建操作符，用于创建发出特定值的Observable
const observable1 = of(1,2,3)
//observable1.subscribe(console.log)
//from 将数组，Promise或迭代器转成Observable
const observable2 = from([1,2,3]);
//observable2.subscribe(console.log)
const observable3 = from(Promise.resolve('ok'));
//observable3.subscribe(console.log)
//throwError是一个创建操作符，用来创建一个立刻发出错误的Observable
const observable4 = throwError(()=>new Error('An error occurred'));
/* observable4.subscribe({
    next:console.log,
    error:err=>console.log(err.message)
})
console.log('continue') */

//管道操作符
//Pipe也是一核心概念，用于将多个操作符组合在一起，形成一个管道 pipeline
//通过这个管道，可以对Observable对象发出的数据进行转换和操作
///tap是一个操作符，用于对Observable对象发出的值进行执行副作用操作，比如记录日志，它不会改变数据流中的值
//of(1,2,3).pipe(tap(value=>console.log('tap',value))).subscribe(value=>console.log('value',value))
//map用于对Observable发出的值进行转换
//pipe是Observable实例上的一个方法，它接受多个操作符作为参数，并返回一个新的Observable
//of(1,2,3).pipe(map(value=>value*2)).subscribe(value=>console.log('value',value))
//catchError 用于捕获Observable中的错误，并返回一个新的Observable
//throwError(()=>new Error('An error occurred'))
//.pipe(catchError((err)=>of(`Caught: ${err}`))).subscribe(value=>console.log('value',value))
//timeout  对Observable增加超时限制，如果到了指定时间还没有发出值，则抛出错误
//delay 暂停一段时间再发出值
of('hello').pipe(delay(2000),timeout(1000)).subscribe({
    error:err=>console.log(err)
})