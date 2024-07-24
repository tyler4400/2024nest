import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class MyPipe implements PipeTransform {
    private prefix;
    constructor(prefix: string);
    transform(value: any, metadata: ArgumentMetadata): string;
}
