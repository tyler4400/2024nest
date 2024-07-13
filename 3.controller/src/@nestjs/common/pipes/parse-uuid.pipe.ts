import {BadRequestException, PipeTransform} from '@nestjs/common';
import {validate} from 'uuid'
export class ParseUUIDPipe implements PipeTransform<string,string>{
    transform(value: string): string {
        if(!validate(value)){
            throw new BadRequestException(`Validation failed (uuid string is expected)`);
        }
        return value;
    }
}