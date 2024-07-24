"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflector = void 0;
const common_1 = require("@nestjs/common");
require("reflect-metadata");
class Reflector {
    get(metadataKey, target, key) {
        return key ? Reflect.getMetadata(metadataKey, target, key) : Reflect.getMetadata(metadataKey, target);
    }
    static createDecorator() {
        function decoratorFactory(metadataValue) {
            return (0, common_1.SetMetadata)(decoratorFactory, metadataValue);
        }
        return decoratorFactory;
    }
}
exports.Reflector = Reflector;
//# sourceMappingURL=reflector.js.map