//mergeMap也是一个操作符，它用于将每个源值映射到一个新的可观察对象，然后将这些可观察对象的值合并到单一输出的可观察对象中
//import {of,mergeMap} from 'rxjs';
//import {map} from 'rxjs/operators'
class Observable {
    constructor(private _subscribe) { }
    subscribe(observer) {
        return this._subscribe(typeof observer === 'function'?{
            next:observer,
            error:()=>{},
            complete:()=>{}
        }:observer)
    }
    //管道方法，接收多个操作符，并依次应用它们
    pipe(operator) {
        return operator(this);
    }
}
function of(...values) {
    return new Observable((observer) => {
        values.forEach(value => observer.next(value));
        observer.complete();
    });
}
function mergeMap(project) {
    //返回一个可接收源可观察对象的函数
  return function(source){
    //返回一个新的可观察对象
    return new Observable((observer)=>{
        source.subscribe(value=>{
            //得到新的内部可观察对象
            const innerObservable =  project(value);
            //订阅内部可观察对象
            innerObservable.subscribe(innerValue=>observer.next(innerValue));
         });
    })
  }
}
of(1, 2, 3)
    .pipe(mergeMap(value => of(value * 2)))
    .subscribe(value => console.log('observer',value))


export { }

/**
function mergeMap(project) {
    //返回一个可接收源可观察对象的函数
  return function(source){
    //返回一个新的可观察对象
    return new Observable((observer)=>{
        source.subscribe({
            next:value=>{
               const innerObservable =  project(value);
               innerObservable.subscribe({
                next:innerValue=>observer.next(innerValue)
               });
            }
        });
    })
  }
}
 */