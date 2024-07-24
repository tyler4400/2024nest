import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ValidationPipe implements PipeTransform {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private formatErrors;
    private needValidate;
}
