import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional,PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {IsString, IsOptional, IsBoolean, IsNumber, IsEmail, MinLength, MaxLength, Validate, IsNotEmpty,} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class CreateUserDto {
    @IsString()
    @ApiProperty({description:'用户名',example:'nick'})
    username: string;

    @PasswordValidators()
    @ApiProperty({description:'密码',example:'666666'})
    password: string;

    @MobileValidators()
    @ApiProperty({description:'手机号',example:'15788888888'})
    @ApiPropertyOptional()
    mobile: string;

    @EmailValidators()
    @ApiProperty({description:'邮件',example:'nick@qq.com'})
    email: string;

    @StatusValidators()
    @ApiProperty({description:'状态',example:1})
    status: number;

    @IsSuperValidators()
    @ApiProperty({description:'是否超级管理员',example:true})
    is_super: boolean;

    @SortValidators()
    @ApiProperty({description:'排序号',example:100})
    sort: number;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({description:'用户ID',example:1})
    @IsOptional()
    @IsNumber()
    id: number;
}
let v:any={};
console.log('validation',i18nValidationMessage('validation.minLength',{field:'password',length:6})(v))
function PasswordValidators() {
    return applyDecorators(
        IsString(),//validation.minLength|{"field":"password","length":6}
        IsNotEmpty({message:i18nValidationMessage('validation.isNotEmpty',{field:'password'})}),
        MinLength(6,{message:i18nValidationMessage('validation.minLength',{field:'password',length:6})}),
        MaxLength(8,{message:i18nValidationMessage('validation.maxLength',{field:'password',length:8})}))
}
function EmailValidators() {
    return applyDecorators(
        IsEmail(), 
        IsNotEmpty({message:i18nValidationMessage('validation.isNotEmpty',{field:'email'})})
    )
}
function MobileValidators() {
    return applyDecorators(IsString(), IsOptional())
}
function StatusValidators() {
    return applyDecorators(IsNumber(), IsOptional(), Type(() => Number))
}
function IsSuperValidators() {
    return applyDecorators(IsBoolean(), IsOptional(), Type(() => Boolean))
}
function SortValidators() {
    return applyDecorators(IsNumber(), IsOptional(), Type(() => Number))
}
//这是一个同步的自定义校验类
