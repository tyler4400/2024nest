import {BadRequestException, PipeTransform} from '@nestjs/common';

export class ParseIntPipe implements PipeTransform<string,number>{
    transform(value: string): number {
        const val = parseInt(value,10);
        if(isNaN(val)){
            throw new BadRequestException(`Validation failed (numeric string is expected)`);
        }
        return val;
    }
}