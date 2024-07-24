"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIntPipe = void 0;
const common_1 = require("@nestjs/common");
class ParseIntPipe {
    transform(value) {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new common_1.BadRequestException(`Validation failed (numeric string is expected)`);
        }
        return val;
    }
}
exports.ParseIntPipe = ParseIntPipe;
//# sourceMappingURL=parse-int.pipe.js.map