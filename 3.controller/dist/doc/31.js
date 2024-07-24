"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging2Interceptor = exports.Logging1Interceptor = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function routerHandler() {
    console.log('pay...');
    return 'pay';
}
class Logging1Interceptor {
    intercept(_, next) {
        console.log('Before1...');
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            console.log(`After1... ${Date.now() - now}ms`);
        }));
    }
}
exports.Logging1Interceptor = Logging1Interceptor;
class Logging2Interceptor {
    intercept(_, next) {
        console.log('Before2...');
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            console.log(`After2... ${Date.now() - now}ms`);
        }));
    }
}
exports.Logging2Interceptor = Logging2Interceptor;
const logging1Interceptor = new Logging1Interceptor();
const logging2Interceptor = new Logging2Interceptor();
function callInterceptors(interceptors) {
    const nextFn = (i = 0) => {
        debugger;
        if (i >= interceptors.length) {
            let result = routerHandler();
            return (0, rxjs_1.of)(result);
        }
        const result = interceptors[i].intercept(null, { handle: () => nextFn(i + 1) });
        return result;
    };
    return nextFn();
}
const interceptors = [logging2Interceptor, logging1Interceptor];
callInterceptors(interceptors).subscribe(value => {
    console.log('value', value);
});
//# sourceMappingURL=31.js.map