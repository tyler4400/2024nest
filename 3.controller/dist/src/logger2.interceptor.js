"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging2Interceptor = void 0;
const operators_1 = require("rxjs/operators");
class Logging2Interceptor {
    intercept(context, next) {
        console.log('Before2...');
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            console.log(`After2... ${Date.now() - now}ms`);
        }));
    }
}
exports.Logging2Interceptor = Logging2Interceptor;
//# sourceMappingURL=logger2.interceptor.js.map