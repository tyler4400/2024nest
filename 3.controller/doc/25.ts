
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';
const next = {
    handle(){//指的就是路由处理函数
        console.log('pay...');
        return of('pay');
     }
}
export class Logging1Interceptor {
    intercept(_, next): Observable<any> {
        console.log('Before1...')
        const now = Date.now();
        return next.handle().pipe(tap(() => {
            console.log(`After1... ${Date.now() - now}ms`)
        }));
    }
}
export class Logging2Interceptor {
    intercept(_, next): Observable<any> {
        console.log('Before2...')
        const now = Date.now();
        return next.handle().pipe(tap(() => {
            console.log(`After2... ${Date.now() - now}ms`)
        }));
    }
}
const logging1Interceptor = new Logging1Interceptor();
const logging2Interceptor = new Logging2Interceptor();
const originalHandler = ()=>next.handle();
const logger1Handler =  ()=>logging1Interceptor.intercept(null,{handle:originalHandler});
const logger2Handler =  ()=>logging2Interceptor.intercept(null,{handle:logger1Handler});
logger2Handler().subscribe(console.log)
/**
Before2...
Before1...
pay...
After1... 3ms
After2... 4ms 
 */