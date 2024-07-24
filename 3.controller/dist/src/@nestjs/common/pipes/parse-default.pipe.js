"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultValuePipe = void 0;
class DefaultValuePipe {
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
    }
    transform(value) {
        return value !== undefined ? value : this.defaultValue;
    }
}
exports.DefaultValuePipe = DefaultValuePipe;
//# sourceMappingURL=parse-default.pipe.js.map