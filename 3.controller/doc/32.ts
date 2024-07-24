
import { Observable, of ,from} from "rxjs";
import { mergeMap, tap } from 'rxjs/operators';
//路由处理函数
async function routerHandler(){
    console.log('pay...')
    return 'pay';
}
export class Logging1Interceptor {
    async intercept(_, next): Promise<Observable<any>> {
        console.log('Before1...')
        const now = Date.now();
        return next.handle().pipe(tap(() => {
            console.log(`After1... ${Date.now() - now}ms`)
        }));
    }
}
export class Logging2Interceptor {
    async intercept(_, next): Promise<Observable<any>> {
        console.log('Before2...')
        const now = Date.now();
        return next.handle().pipe(tap(() => {
            console.log(`After2... ${Date.now() - now}ms`)
        }));
    }
}
const logging1Interceptor = new Logging1Interceptor();
const logging2Interceptor = new Logging2Interceptor();
function callInterceptors(interceptors){
 const nextFn = (i=0):Observable<any>=>{
    if(i>=interceptors.length){
        let result = routerHandler();
        return result instanceof Promise?from(result):of(result);
    }
    const result = interceptors[i].intercept(null,{handle:()=>nextFn(i+1)});
    return from(result).pipe(mergeMap(res=>res instanceof Observable?res:of(res)))
 }
 return nextFn();
}
const interceptors = [logging2Interceptor,logging1Interceptor];
callInterceptors(interceptors).subscribe(value=>{
    console.log('value',value)
});