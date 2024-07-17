import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {Request} from 'express';
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean  {
        //从处理程序的方法的元数据上获取角色信息
        const roles = this.reflector.get('roles',context.getHandler());
        //如果没有为此路由处理函数设置角色，那表示此路由可以被 任何人访问
        if(!roles){
            return true;
        }
        //获得当前的请求对象
        const request  = context.switchToHttp().getRequest<Request>();
        //获得当前的用户，以及用户的角色
        const user = request.user;
        return matchRoles(roles,user.roles);;
    }
}
function matchRoles(roles,userRoles){
   return userRoles.some(userRole=>roles.includes(userRole));
}