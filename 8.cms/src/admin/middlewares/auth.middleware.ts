import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Access } from "src/shared/entities/access.entity";
import { AccessService } from "src/shared/services/access.service";
import{AccessType} from 'src/shared/dto/access.dto';
import {match} from 'path-to-regexp';
@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(
        private readonly accessService:AccessService
    ){}
    async use(req: any, res: any, next: (error?: Error | any) => void) {
        //如果登录成功之后，会把登录的对象放在会话对象中
        const user = req.session.user;
        if(!user){//如果没有user，说明此用户尚未登录，则去登录页进行登录
            return res.redirect('/admin/logout');
        }
        //locals的属性可以用来渲染模板
        res.locals.user= user;
        //构建菜单树
        //先获取完整的资源树
        const accessTree = await this.accessService.findAll();
        //获取当前用户有权限的资源
        const userAccessIds =  this.getUserAccessIds(user);
        const menuTree = user.is_super?accessTree:this.getUserMenuTree(accessTree,userAccessIds);
       
        //获取菜单树并且放在模板对象的上下文中，可以在渲染模板的时候使用
        res.locals.menuTree = menuTree;
        if(user.is_super || req.originalUrl === '/admin/welcome'){//如果是超级管理员
            return next();
        }

        //如果不是超级管理员，则要判断此用户是否有权限访问此路径
        if(this.hasPermission(user,req.originalUrl)){
            return next();
        }else{
            res.status(HttpStatus.FORBIDDEN).render('error',{message:'无权限访问此页面',layout:false})
        }
    }
    private hasPermission(user,url:string){
        //获取此用户所有权限的url地址
        const userAccessUrls = user.roles.flatMap(role=>role.accesses.map(access=>access.url));
        console.log(userAccessUrls,url)
        return userAccessUrls.some(urlPattern=>match(urlPattern)(url));
    }
    private getUserAccessIds(user):number[]{
        //{roles:[{name:'role1',accesses:[{id:1},{id:2}]},{name:'role2',accesses:[{id:3},{id:4}]}]}
        //map[[1,2],[3,4]]
        //flatMap [1,2,3,4]
        const userAccessIds =  user.roles.flatMap(role=>role.accesses.map(access=>access.id));
        return [...new Set(userAccessIds).values()] as number[];
    }
    private getUserMenuTree(accessTree:Access[],userAccessIds:number[]){
        return accessTree.filter(access=>{
            //如果此资源是一个功能，或者此用户没有此资源的权限，那就返回false进行过滤
            if(access.type === AccessType.FEATURE || !userAccessIds.includes(access.id)){
                return false;
            }
            if(access.children){
                access.children = this.getUserMenuTree(access.children,userAccessIds);
            }
            return true
        });
    }
}