//import {of} from 'rxjs';
//of是一个创建可观察对象的函数，它接收任意数量的参数，并将这些参数依次作为数据项发出来
class Observable{
    constructor(private _subscribe){}
    //订阅方法，接受一个观察者对象
    subscribe(observer){
        //调用存储的订阅函数，并传入观察者对象
        return this._subscribe(observer)
    }
}
//定义一个of函数，用于创建包含指定值的可观察对象
function of(...values){
   return new Observable((observer)=>{
      values.forEach(value=>observer.next(value));
      observer.complete();
   });
}
of(1,2,3).subscribe({
    next:value=>console.log(value),
    error:console.error,
    complete:()=>console.log('completed')
});