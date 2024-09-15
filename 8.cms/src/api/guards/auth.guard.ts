import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Request} from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationService } from 'src/shared/services/configuration.service';
import { UserService } from 'src/shared/services/user.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService,
    private readonly configurationService:ConfigurationService,
    private readonly userService:UserService,
  ){

  }
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException('Token未提供');
    }
    try{
      let decodeUser = this.jwtService.verify(token,{secret:this.configurationService.jwtSecret})
      if(decodeUser){
        let user = await this.userService.findOne({where:{id:decodeUser.id}});
        if(user){
          delete user.password;
          request.user= user;
          return true;
        }else{
          throw new UnauthorizedException('用户不存在');
        }
      }else{
        throw new UnauthorizedException('Token无效');
      }
    }catch(error){
      throw new UnauthorizedException('Token不合法或已过期');
    }
  }
  private extractTokenFromHeader(request:Request){
    const [type,token] = request.headers.authorization?.split(' ')??[];
    return type==='Bearer'?token:undefined;
  }
}
