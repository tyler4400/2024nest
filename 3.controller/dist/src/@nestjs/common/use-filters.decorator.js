"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseFilters = void 0;
require("reflect-metadata");
function UseFilters(...filters) {
    return (target, propertyKey, descriptor) => {
        if (descriptor) {
            Reflect.defineMetadata('filters', filters, descriptor.value);
        }
        else {
            Reflect.defineMetadata('filters', filters, target);
        }
    };
}
exports.UseFilters = UseFilters;
//# sourceMappingURL=use-filters.decorator.js.map