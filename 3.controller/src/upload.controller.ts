import {
    UseInterceptors,
    Controller,
    Post,
    UploadedFile,ParseFilePipe,UploadedFiles,
    MaxFileSizeValidator,
    FileTypeValidator} from '@nestjs/common';
import {FileInterceptor,FilesInterceptor,FileFieldsInterceptor,AnyFilesInterceptor,NoFilesInterceptor} from '@nestjs/platform-express';   
import {FileSizeValidationPipe} from './pipes/file-size-validation.pipe'; 

@Controller('upload')
export class UploadController{
    @Post('file')
    @UseInterceptors(FileInterceptor('file'))//FileInterceptor作用是把文件信息保存req.file
    file(@UploadedFile(FileSizeValidationPipe) file: Express.Multer.File){
        console.log('file',file);
        return {message:'uploaded'}
    }

    @Post('parse-file')
    @UseInterceptors(FileInterceptor('file'))//FileInterceptor作用是把文件信息保存req.file
    parseFile(@UploadedFile(new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({maxSize:1024*400}),
            new FileTypeValidator({fileType:'image/png'})
        ]
    })) file: Express.Multer.File){
        console.log('file',file);
        return {message:'uploaded'}
    }

    @Post('files')
    @UseInterceptors(FilesInterceptor('files',10))//FileInterceptor作用是把文件信息保存req.file
    files(@UploadedFiles(FileSizeValidationPipe) files: Express.Multer.File){
        console.log('files',files);
        return {message:'uploaded'}
    }

    @Post('file-fields')
    @UseInterceptors(FileFieldsInterceptor([
        {name:'avatar',maxCount:1},
        {name:"background",maxCount:1}
    ]))//FileInterceptor作用是把文件信息保存req.file
    fileFields(@UploadedFiles() files: {avatar:Express.Multer.File[],background:Express.Multer.File[]}){
        console.log('files',files);
        return {message:'uploaded'}
    }

    @Post('any-files')
    @UseInterceptors(AnyFilesInterceptor())//FileInterceptor作用是把文件信息保存req.file
    anyfiles(@UploadedFiles() files: Express.Multer.File[]){
        console.log('files',files);
        return {message:'uploaded'}
    }

    @Post('no-files')
    @UseInterceptors(NoFilesInterceptor())//FileInterceptor作用是把文件信息保存req.file
    @UseInterceptors(FileInterceptor('file'))
    noFiles(){
        return {message:'no file'}
    }
}