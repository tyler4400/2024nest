import {Observable} from 'rxjs';
export interface CallHandler<T = any> {
    handle(): Observable<T>;
}