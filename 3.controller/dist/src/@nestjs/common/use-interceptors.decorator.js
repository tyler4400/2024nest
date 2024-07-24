"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseInterceptors = void 0;
require("reflect-metadata");
function UseInterceptors(...interceptors) {
    return (target, propertyKey, descriptor) => {
        if (descriptor) {
            const existingInterceptors = Reflect.getMetadata('interceptors', descriptor.value) ?? [];
            Reflect.defineMetadata('interceptors', [...existingInterceptors, ...interceptors], descriptor.value);
        }
        else {
            const existingInterceptors = Reflect.getMetadata('interceptors', descriptor.valutarget) ?? [];
            Reflect.defineMetadata('interceptors', [...existingInterceptors, ...interceptors], target);
        }
    };
}
exports.UseInterceptors = UseInterceptors;
//# sourceMappingURL=use-interceptors.decorator.js.map