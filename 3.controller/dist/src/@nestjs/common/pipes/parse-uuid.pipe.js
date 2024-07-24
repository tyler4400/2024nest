"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseUUIDPipe = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
class ParseUUIDPipe {
    transform(value) {
        if (!(0, uuid_1.validate)(value)) {
            throw new common_1.BadRequestException(`Validation failed (uuid string is expected)`);
        }
        return value;
    }
}
exports.ParseUUIDPipe = ParseUUIDPipe;
//# sourceMappingURL=parse-uuid.pipe.js.map