"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseEnumPipe = void 0;
const common_1 = require("@nestjs/common");
class ParseEnumPipe {
    constructor(enumType) {
        this.enumType = enumType;
    }
    transform(value) {
        const enumValues = Object.values(this.enumType);
        if (!enumValues.includes(value)) {
            throw new common_1.BadRequestException(`Validation failed (${value} is not a valid enum)`);
        }
        return value;
    }
}
exports.ParseEnumPipe = ParseEnumPipe;
//# sourceMappingURL=parse-enum.pipe.js.map