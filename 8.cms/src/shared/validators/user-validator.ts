import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { User } from "../entities/user.entity";
import {Repository} from 'typeorm';
@Injectable()//装饰器，用于定义自定义验证器。可以指定验证器名称和是否为异步。
@ValidatorConstraint({ name: 'startsWith', async: false })
class StartsWithConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        const { constraints } = validationArguments;
        return value.startsWith(constraints[0]);
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        const { property,constraints } = validationArguments;
        return `${property} must start with ${constraints[0]}`
    }
}
export function StartsWith(prefix: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({//object 是CreateUserDto的类的原型 
            target: object.constructor,//注册装饰器的目标类 CreateUserDto 
            propertyName,//username//目标属性名
            options: validationOptions,//验证选项
            constraints: [prefix],//传递给验证器的参数，比如前缀
            validator: StartsWithConstraint//指定使用哪个验证器类 s
        });
    }
}
@Injectable()//装饰器，用于定义自定义验证器。可以指定验证器名称和是否为异步。
@ValidatorConstraint({ name: 'IsUsernameUnique', async: true })
class IsUsernameUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(User) protected repository:Repository<User>
      ){
       console.log('repository',this.repository)
      }
    async validate(value: any, validationArguments?: ValidationArguments) {
        const result = await this.repository.findOneBy({username:value});
        return !result;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        const { property,value } = validationArguments;
        return `${property} ${value} is already taken!`
    }
}
export function IsUsernameUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({//object 是CreateUserDto的类的原型 
            target: object.constructor,//注册装饰器的目标类 CreateUserDto 
            propertyName,//username//目标属性名
            options: validationOptions,//验证选项
            constraints: [],//传递给验证器的参数，比如前缀
            validator: IsUsernameUniqueConstraint//指定使用哪个验证器类 s
        });
    }
}