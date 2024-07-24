"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseGuards = void 0;
require("reflect-metadata");
function UseGuards(...guards) {
    return (target, propertyKey, descriptor) => {
        if (descriptor) {
            Reflect.defineMetadata('guards', guards, descriptor.value);
        }
        else {
            Reflect.defineMetadata('guards', guards, target);
        }
    };
}
exports.UseGuards = UseGuards;
//# sourceMappingURL=use-guards.decorator.js.map