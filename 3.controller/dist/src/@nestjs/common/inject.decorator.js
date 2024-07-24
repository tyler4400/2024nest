"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
require("reflect-metadata");
const _1 = require("./");
function Inject(token) {
    return (target, propertyKey, parameterIndex) => {
        const existingInjectedTokens = Reflect.getMetadata(_1.INJECTED_TOKENS, target) ?? [];
        existingInjectedTokens[parameterIndex] = token;
        Reflect.defineMetadata(_1.INJECTED_TOKENS, existingInjectedTokens, target);
    };
}
exports.Inject = Inject;
//# sourceMappingURL=inject.decorator.js.map