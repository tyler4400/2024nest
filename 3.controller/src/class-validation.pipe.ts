import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { validate } from 'class-validator';
import { plainToInstance } from "class-transformer";
export class ClassValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        //如果metaType不存在，或者存在但是基础类型，则不需要校验
        if (!metatype || !this.needValidate(metatype)) {
            return value;
        }
        const instance = plainToInstance(metatype, value);
        const errors = await validate(instance);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
    private needValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype)
    }
}
