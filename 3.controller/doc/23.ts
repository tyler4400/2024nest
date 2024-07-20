import {Observable} from 'rxjs';
const observable = new Observable((subscriber)=>{
    let count = 0;
    const intervalId = setInterval(()=>{
        subscriber.next(count++);
    },1000)
    return ()=>{
        clearInterval(intervalId);
        console.log('unsubscribed')
    }

})
//subscription表示一个对observable的订阅
//通过subscription，可以取消订阅，也可以组合多个订阅
const subscription = observable.subscribe((value)=>console.log(value));
setTimeout(()=>{
    subscription.unsubscribe();
},3000)