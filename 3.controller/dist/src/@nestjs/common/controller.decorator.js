"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
require("reflect-metadata");
function Controller(prefixOrOptions) {
    let options = {};
    if (typeof prefixOrOptions === 'string') {
        options.prefix = prefixOrOptions;
    }
    else if (typeof prefixOrOptions === 'object') {
        options = prefixOrOptions;
    }
    return (target) => {
        Reflect.defineMetadata('prefix', options.prefix || '', target);
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.decorator.js.map