import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    /**
     * 一般会在此处给req.user赋值
     * 如何赋值关键要看你鉴权使用哪种方法，一般有两种 session JWT
     * 
     */
    //如果使用上次用户登录后把用户信息保存在session中的话
    //req.user = req.session.user;
    //如果是用的JWT的话
    //const token -> user -> req.user = 
    req.user = {id:1,name:'nick',roles:[req.query.role]}
    next();
  }
}
