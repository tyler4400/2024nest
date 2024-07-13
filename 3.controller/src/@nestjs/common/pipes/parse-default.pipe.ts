import { PipeTransform } from '@nestjs/common';
export class DefaultValuePipe implements PipeTransform<string, string> {
    constructor(private readonly defaultValue: any) { }
    transform(value: string): string {
        return value !== undefined ? value : this.defaultValue;
    }
}