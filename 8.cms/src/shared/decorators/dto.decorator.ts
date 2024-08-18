import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber} from 'class-validator';
export function IdValidators() {
    return applyDecorators(ApiProperty({description:'用户ID',example:1}),
    IsOptional(),
    IsNumber())
}
export function StatusValidators() {
    return applyDecorators(IsNumber(), IsOptional(), Type(() => Number))
}
export function SortValidators() {
    return applyDecorators(IsNumber(), IsOptional(), Type(() => Number))
}