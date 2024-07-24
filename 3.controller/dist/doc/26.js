"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging2Interceptor = exports.Logging1Interceptor = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const next = {
    handle() {
        console.log('pay...');
        return (0, rxjs_1.of)('pay');
    }
};
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
function executeInterceptors(interceptors) {
    let currentHandler = () => next.handle();
    interceptors.forEach((interceptor) => {
        const previousHandler = currentHandler;
        currentHandler = () => interceptor.intercept(null, { handle: previousHandler });
    });
    return currentHandler();
}
const logging1Interceptor = new Logging1Interceptor();
const logging2Interceptor = new Logging2Interceptor();
executeInterceptors([logging1Interceptor, logging2Interceptor]).subscribe(console.log);
//# sourceMappingURL=26.js.map