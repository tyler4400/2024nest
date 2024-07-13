import { BadRequestException, PipeTransform } from '@nestjs/common';
interface ParseArrayOptions {
    items: any;
    separator?: string;
}

export class ParseArrayPipe implements PipeTransform<string, any[]> {
    constructor(private readonly options: ParseArrayOptions) { }
    transform(value: string): any[] {
        if (!value) {
            return [];
        }
        const { items=String, separator = ',' } = this.options??{};
        const values = value.split(separator).map(item => {
            if (items === String) {
                return item;
            } else if (items === Number) {
                const val = Number(item);
                if (isNaN(val)) {
                    throw new BadRequestException(`Validation failed (number is expected)`);
                }
                return val;
            } else if (items === Boolean) {
                if (item.toLowerCase() === 'true') {
                    return true;
                } else if (item.toLowerCase() === 'false') {
                    return false;
                } else {
                    throw new BadRequestException(`Validation failed (boolean is expected)`);
                }
            }else{
                return item;
            }
        });
        return values;
    }
}