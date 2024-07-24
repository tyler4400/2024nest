"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const observable1 = (0, rxjs_1.of)(1, 2, 3);
const observable2 = (0, rxjs_1.from)([1, 2, 3]);
const observable3 = (0, rxjs_1.from)(Promise.resolve('ok'));
const observable4 = (0, rxjs_1.throwError)(() => new Error('An error occurred'));
(0, rxjs_1.of)('hello').pipe((0, operators_1.delay)(2000), (0, operators_1.timeout)(1000)).subscribe({
    error: err => console.log(err)
});
//# sourceMappingURL=24.js.map