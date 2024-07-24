import { PipeTransform } from '@nestjs/common';
export declare class ParseFloatPipe implements PipeTransform<string, number> {
    transform(value: string): number;
}
