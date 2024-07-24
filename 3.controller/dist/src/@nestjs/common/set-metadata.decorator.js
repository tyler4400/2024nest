"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetMetadata = void 0;
require("reflect-metadata");
function SetMetadata(metadataKey, metadataValue) {
    return (target, propertyKey, descriptor) => {
        if (descriptor) {
            Reflect.defineMetadata(metadataKey, metadataValue, descriptor.value);
        }
        else {
            Reflect.defineMetadata(metadataKey, metadataValue, target);
        }
    };
}
exports.SetMetadata = SetMetadata;
//# sourceMappingURL=set-metadata.decorator.js.map