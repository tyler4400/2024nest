"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseArrayPipe = void 0;
const common_1 = require("@nestjs/common");
class ParseArrayPipe {
    constructor(options) {
        this.options = options;
    }
    transform(value) {
        if (!value) {
            return [];
        }
        const { items = String, separator = ',' } = this.options ?? {};
        const values = value.split(separator).map(item => {
            if (items === String) {
                return item;
            }
            else if (items === Number) {
                const val = Number(item);
                if (isNaN(val)) {
                    throw new common_1.BadRequestException(`Validation failed (number is expected)`);
                }
                return val;
            }
            else if (items === Boolean) {
                if (item.toLowerCase() === 'true') {
                    return true;
                }
                else if (item.toLowerCase() === 'false') {
                    return false;
                }
                else {
                    throw new common_1.BadRequestException(`Validation failed (boolean is expected)`);
                }
            }
            else {
                return item;
            }
        });
        return values;
    }
}
exports.ParseArrayPipe = ParseArrayPipe;
//# sourceMappingURL=parse-array.pipe.js.map