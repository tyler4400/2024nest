import { PipeTransform } from '@nestjs/common';
export declare class DefaultValuePipe implements PipeTransform<string, string> {
    private readonly defaultValue;
    constructor(defaultValue: any);
    transform(value: string): string;
}
