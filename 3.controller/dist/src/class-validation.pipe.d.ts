import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ClassValidationPipe implements PipeTransform {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private needValidate;
}
