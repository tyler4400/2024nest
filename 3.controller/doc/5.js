"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject2 = exports.Inject1 = void 0;
function Inject1() {
    return function (target, propertyKey, parameterIndex) {
        console.log('Inject1', target);
        //说明target是类本身
    };
}
exports.Inject1 = Inject1;
function Inject2() {
    return function (target, propertyKey, parameterIndex) {
        //Inject2 {} target是Person类的原型
        console.log('Inject2', target);
    };
}
exports.Inject2 = Inject2;
var Person = /** @class */ (function () {
    function Person(a) {
    }
    Person.prototype.method = function (b) {
    };
    return Person;
}());
