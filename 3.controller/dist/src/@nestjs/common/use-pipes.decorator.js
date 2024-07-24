"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsePipes = void 0;
require("reflect-metadata");
function UsePipes(...pipes) {
    return (target, propertyKey, descriptor) => {
        if (descriptor) {
            Reflect.defineMetadata('pipes', pipes, descriptor.value);
        }
        else {
            Reflect.defineMetadata('pipes', pipes, target);
        }
    };
}
exports.UsePipes = UsePipes;
//# sourceMappingURL=use-pipes.decorator.js.map