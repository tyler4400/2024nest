"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catch = void 0;
require("reflect-metadata");
function Catch(...exceptions) {
    return (target) => {
        Reflect.defineMetadata('catch', exceptions, target);
    };
}
exports.Catch = Catch;
//# sourceMappingURL=catch.decorator.js.map