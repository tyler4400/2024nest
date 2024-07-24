"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const observable = new rxjs_1.Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
});
const subscription = observable.subscribe({
    next(x) { console.log('x', x); },
    error(err) { console.error(err); },
    complete() { console.log('Done'); }
});
//# sourceMappingURL=22.js.map