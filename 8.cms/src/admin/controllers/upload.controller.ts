import { Controller,Get,Post,Query,Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
import * as sharp from 'sharp'
import * as fs from 'fs';
import { CosService } from 'src/shared/services/cos.service';
@Controller('admin')
export class UploadController {
    constructor(private readonly cosService:CosService){

    }
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
        //设置压缩后的文件 名  xxx.min.jpeg
        const filename = `${path.basename(file.filename,path.extname(file.filename))}.min.jpeg`;
        const outputFilePath = `./uploads/${filename}`;
        await sharp(file.path)
        .resize(800,600,{
            fit:sharp.fit.inside,//使用inside适应的方式去缩放图片
            withoutEnlargement:true,//防止图像被放大
        })
        .toFormat('jpeg')//转换图像为jpeg格式
        .jpeg({quality:80})//指定图片压缩的质量为80%
        .toFile(outputFilePath)//设置处理后的图像到指定的路径
        fs.unlinkSync(file.path);//删除原始文件 
        return {url:`/uploads/${filename}}`}
    }

    @Get('cos-signature')
    async getCosSignature(@Query('key') key:string){
        return this.cosService.getAuth(key,60);
    }
}
