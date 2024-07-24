"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.needValidate(metatype)) {
            return value;
        }
        const instance = (0, class_transformer_1.plainToInstance)(metatype, value);
        const errors = await (0, class_validator_1.validate)(instance);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(this.formatErrors(errors));
        }
        return value;
    }
    formatErrors(errors) {
        return errors.map(error => {
            for (const property in error.constraints) {
                return `${error.property} - ${error.constraints[property]}`;
            }
        }).join(',');
    }
    needValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation-pipe.js.map