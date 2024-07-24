"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ClassValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.needValidate(metatype)) {
            return value;
        }
        const instance = (0, class_transformer_1.plainToInstance)(metatype, value);
        const errors = await (0, class_validator_1.validate)(instance);
        if (errors.length > 0) {
            throw new common_1.BadRequestException('Validation failed');
        }
        return value;
    }
    needValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
exports.ClassValidationPipe = ClassValidationPipe;
//# sourceMappingURL=class-validation.pipe.js.map