"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject2 = exports.Inject1 = void 0;
function Inject1() {
    return (target, propertyKey, parameterIndex) => {
        console.log('Inject1', target);
    };
}
exports.Inject1 = Inject1;
function Inject2() {
    return (target, propertyKey, parameterIndex) => {
        console.log('Inject2', target);
    };
}
exports.Inject2 = Inject2;
let Person = class Person {
    constructor(a) {
    }
    method(b) {
    }
};
__decorate([
    __param(0, Inject2()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Person.prototype, "method", null);
Person = __decorate([
    __param(0, Inject1()),
    __metadata("design:paramtypes", [Number])
], Person);
//# sourceMappingURL=5.js.map