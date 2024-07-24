"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseFloatPipe = void 0;
const common_1 = require("@nestjs/common");
class ParseFloatPipe {
    transform(value) {
        const val = parseFloat(value);
        if (isNaN(val)) {
            throw new common_1.BadRequestException(`Validation failed (float string is expected)`);
        }
        return val;
    }
}
exports.ParseFloatPipe = ParseFloatPipe;
//# sourceMappingURL=parse-float.pipe.js.map