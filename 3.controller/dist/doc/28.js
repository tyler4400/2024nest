"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Observable {
    constructor(_subscribe) {
        this._subscribe = _subscribe;
    }
    subscribe(observer) {
        return this._subscribe(observer);
    }
}
function from(input) {
    return new Observable((observer) => {
        if (input instanceof Promise) {
            input.then(value => {
                observer.next(value);
                observer.complete();
            }, error => {
                observer.error(error);
            });
        }
        else {
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
//# sourceMappingURL=28.js.map