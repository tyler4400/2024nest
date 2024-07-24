"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseBoolPipe = void 0;
const common_1 = require("@nestjs/common");
class ParseBoolPipe {
    transform(value) {
        if (value.toLowerCase() === 'true') {
            return true;
        }
        else if (value.toLowerCase() === 'false') {
            return false;
        }
        else {
            throw new common_1.BadRequestException(`Validation failed (boolean string is expected)`);
        }
    }
}
exports.ParseBoolPipe = ParseBoolPipe;
//# sourceMappingURL=parse-bool.pipe.js.map