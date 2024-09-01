import { Controller,Post,Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
@Controller('admin')
export class UploadController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('upload',{
        storage:diskStorage({
            destination:'./uploads',//存储文件的路径
            filename:(req,file,callback)=>{
                const filename = uuidv4()+path.extname(file.originalname);
                callback(null,filename);//文件 保存的名称
            }
        }),
        fileFilter:(req,file,callback)=>{//文件类型的过滤器
            //mimetype image/jpg image/gif     xxx.jpg
            if(!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)){
                return callback(new Error('不支持的文件类型'),false);
            }
            callback(null,true);
        }
    }))
    async uploadFile(@UploadedFile() file:Express.Multer.File){
        return {url:`/uploads/${file.filename}`}
    }
}
