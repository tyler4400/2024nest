import { ArgumentMetadata, BadRequestException, Inject, PipeTransform } from "@nestjs/common";
export class FileSizeValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        //定义最大的文件大小
       const maxSize = 1024 * 1024;
       //定义如果文件 大小超过最大值，则抛出异常
        if(value.size > maxSize){
            throw new BadRequestException('File size is too large.');
        }
        return value;
    }
    
}