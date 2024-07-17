import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from "class-transformer";
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.needValidate(metatype)) {
            return value;
        }
        const instance = plainToInstance(metatype, value);
        const errors = await validate(instance);
        if (errors.length > 0) {
            throw new BadRequestException(this.formatErrors(errors));
        }
        return value;
    }
    private formatErrors(errors:ValidationError[]){
        return errors.map(error=>{
            for(const property in error.constraints){
                return `${error.property} - ${error.constraints[property]}`;
            }
        }).join(',')
    }
    private needValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype)
    }
}
