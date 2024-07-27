import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import {Request,Response} from 'express';
import {MulterConfigService} from '@nestjs/platform-express'

//定义一个拦截器的工厂函数，接收一个字段名作为参数
export function FileInterceptor(fieldName:string){
    @Injectable()
    class FileInterceptor implements NestInterceptor{
        constructor(readonly multerConfigService:MulterConfigService){}
        //实现了NestInterceptor里面的intercept方法
        async intercept(context: ExecutionContext, next: CallHandler<any>) {
            const request = context.switchToHttp().getRequest<Request>();
            const response = context.switchToHttp().getResponse<Response>();
            //当需要处理单个字段的单个文件上传的时候可以使用single(fieldName)得到一个Express中间件函数
            const upload = this.multerConfigService.getMulterInstance().single(fieldName);
            //使用Promise包装multer的单文件 上传中间件
            await new Promise<void>((resolve,reject)=>{
                upload(request,response,(err)=>{
                    err?reject(err):resolve();// 处理上传的文件 ，并赋值给req.file
                })
            });
            //等异步上传完成后再调用nest.handle()继续向后执行处理请求
            return next.handle();
        }
    }
    return FileInterceptor;
}

export function FilesInterceptor(fieldName:string,maxCount?:number){
    @Injectable()
    class FilesInterceptor implements NestInterceptor{
        constructor(readonly multerConfigService:MulterConfigService){}
        //实现了NestInterceptor里面的intercept方法
        async intercept(context: ExecutionContext, next: CallHandler<any>) {
            const request = context.switchToHttp().getRequest<Request>();
            const response = context.switchToHttp().getResponse<Response>();
            //当需要处理单个字段的单个文件上传的时候可以使用single(fieldName)得到一个Express中间件函数
            const upload = this.multerConfigService.getMulterInstance().array(fieldName,maxCount);
            //使用Promise包装multer的单文件 上传中间件
            await new Promise<void>((resolve,reject)=>{
                upload(request,response,(err)=>{
                    err?reject(err):resolve();// 处理上传的文件 ，并赋值给req.file
                })
            });
            //等异步上传完成后再调用nest.handle()继续向后执行处理请求
            return next.handle();
        }
    }
    return FilesInterceptor;
}
export function FileFieldsInterceptor(uploadedFiles){
    @Injectable()
    class FileFieldsInterceptor implements NestInterceptor{
        constructor(readonly multerConfigService:MulterConfigService){}
        //实现了NestInterceptor里面的intercept方法
        async intercept(context: ExecutionContext, next: CallHandler<any>) {
            const request = context.switchToHttp().getRequest<Request>();
            const response = context.switchToHttp().getResponse<Response>();
            //当需要处理单个字段的单个文件上传的时候可以使用single(fieldName)得到一个Express中间件函数
            const upload = this.multerConfigService.getMulterInstance().fields(uploadedFiles);
            //使用Promise包装multer的单文件 上传中间件
            await new Promise<void>((resolve,reject)=>{
                upload(request,response,(err)=>{
                    err?reject(err):resolve();// 处理上传的文件 ，并赋值给req.file
                })
            });
            //等异步上传完成后再调用nest.handle()继续向后执行处理请求
            return next.handle();
        }
    }
    return FileFieldsInterceptor;
}
export function AnyFilesInterceptor(){
    @Injectable()
    class AnyFilesInterceptor implements NestInterceptor{
        constructor(readonly multerConfigService:MulterConfigService){}
        //实现了NestInterceptor里面的intercept方法
        async intercept(context: ExecutionContext, next: CallHandler<any>) {
            const request = context.switchToHttp().getRequest<Request>();
            const response = context.switchToHttp().getResponse<Response>();
            //当需要处理单个字段的单个文件上传的时候可以使用single(fieldName)得到一个Express中间件函数
            const upload = this.multerConfigService.getMulterInstance().any();
            //使用Promise包装multer的单文件 上传中间件
            await new Promise<void>((resolve,reject)=>{
                upload(request,response,(err)=>{
                    err?reject(err):resolve();// 处理上传的文件 ，并赋值给req.file
                })
            });
            //等异步上传完成后再调用nest.handle()继续向后执行处理请求
            return next.handle();
        }
    }
    return AnyFilesInterceptor;
}
export function NoFilesInterceptor(){
    @Injectable()
    class NoFilesInterceptor implements NestInterceptor{
        //实现了NestInterceptor里面的intercept方法
        async intercept(context: ExecutionContext, next: CallHandler<any>) {
            const request = context.switchToHttp().getRequest<Request>();
            if(request.file || request.files){
                throw new BadRequestException('Files are not allowed');
            }
            return next.handle();
        }
    }
    return NoFilesInterceptor;
}