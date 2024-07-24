"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Observable {
    constructor(_subscribe) {
        this._subscribe = _subscribe;
    }
    subscribe(observer) {
        return this._subscribe(typeof observer === 'function' ? {
            next: observer,
            error: () => { },
            complete: () => { }
        } : observer);
    }
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
    return function (source) {
        return new Observable((observer) => {
            source.subscribe(value => {
                const innerObservable = project(value);
                innerObservable.subscribe(innerValue => observer.next(innerValue));
            });
        });
    };
}
of(1, 2, 3)
    .pipe(mergeMap(value => of(value * 2)))
    .subscribe(value => console.log('observer', value));
//# sourceMappingURL=29.js.map