import { PipeTransform } from '@nestjs/common';
export declare class ParseBoolPipe implements PipeTransform<string, boolean> {
    transform(value: string): boolean;
}
