import { PipeTransform } from '@nestjs/common';
export declare class ParseUUIDPipe implements PipeTransform<string, string> {
    transform(value: string): string;
}
