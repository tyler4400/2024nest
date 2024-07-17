import {IsString,IsInt} from 'class-validator';

export class CreateUserDto{
    @IsString()
    name:string;
    @IsInt()
    age:number;
}