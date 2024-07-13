import {BadRequestException, PipeTransform} from '@nestjs/common';
export class ParseEnumPipe implements PipeTransform<string,string>{
    constructor(private readonly enumType:any){}
    transform(value: string): string {
        const enumValues = Object.values(this.enumType);
        if(!enumValues.includes(value)){
           throw new BadRequestException(`Validation failed (${value} is not a valid enum)`);
        }
        return value;
    }
}