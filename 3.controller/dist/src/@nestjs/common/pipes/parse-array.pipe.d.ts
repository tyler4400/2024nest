import { PipeTransform } from '@nestjs/common';
interface ParseArrayOptions {
    items: any;
    separator?: string;
}
export declare class ParseArrayPipe implements PipeTransform<string, any[]> {
    private readonly options;
    constructor(options: ParseArrayOptions);
    transform(value: string): any[];
}
export {};
