import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional,PartialType as PartialTypeFromSwagger } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {IsString, IsOptional, IsBoolean, IsEmail, MinLength, MaxLength, Validate, IsNotEmpty} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsUsernameUniqueConstraint } from '../validators/user-validator';
import {PartialType,OmitType} from '@nestjs/mapped-types'
import {IdValidators,StatusValidators,SortValidators} from '../decorators/dto.decorator';
export class CreateUserDto {
    @IsString()
    @ApiProperty({description:'用户名',example:'nick'})
    @Validate(IsUsernameUniqueConstraint, [], {
        message: i18nValidationMessage('validation.usernameIsNotUnique')
    })
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
export class UpdateUserDto extends PartialTypeFromSwagger(OmitType(PartialType(CreateUserDto),['username','password'])) {
    @IdValidators()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({description:'用户名',example:'nick'})
    username: string;

    @ApiProperty({description:'密码',example:'666666'})
    @IsOptional()
    password: string;
}
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

function IsSuperValidators() {
    return applyDecorators(IsBoolean(), IsOptional(), Type(() => Boolean))
}


