import { PipeTransform } from '@nestjs/common';
export declare class ParseEnumPipe implements PipeTransform<string, string> {
    private readonly enumType;
    constructor(enumType: any);
    transform(value: string): string;
}
