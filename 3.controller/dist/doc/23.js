"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const observable = new rxjs_1.Observable((subscriber) => {
    let count = 0;
    const intervalId = setInterval(() => {
        subscriber.next(count++);
    }, 1000);
    return () => {
        clearInterval(intervalId);
        console.log('unsubscribed');
    };
});
const subscription = observable.subscribe((value) => console.log(value));
setTimeout(() => {
    subscription.unsubscribe();
}, 3000);
//# sourceMappingURL=23.js.map