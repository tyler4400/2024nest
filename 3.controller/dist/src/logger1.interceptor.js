"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging1Interceptor = void 0;
const operators_1 = require("rxjs/operators");
class Logging1Interceptor {
    intercept(context, next) {
        console.log('Before1...');
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            console.log(`After1... ${Date.now() - now}ms`);
        }));
    }
}
exports.Logging1Interceptor = Logging1Interceptor;
//# sourceMappingURL=logger1.interceptor.js.map