"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
(0, rxjs_1.from)(Promise.reject('error')).subscribe({
    next: value => console.log(value),
    error: console.error,
    complete: () => console.log('completed')
});
//# sourceMappingURL=30.js.map