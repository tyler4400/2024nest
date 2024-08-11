
export class CreateUserDto{
    username:string;
    password:string;
    mobile:string;
    email:string;
    status:number;
    is_super:boolean;
    sort:number;
}
export class UpdateUserDto extends CreateUserDto{
    id:number;
}