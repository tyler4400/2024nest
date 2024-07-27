import { Injectable, ArgumentMetadata, BadRequestException, Inject, PipeTransform } from "@nestjs/common";
import { FileValidator } from "./file-validator";

export interface ParseFileOptions {
    validators?: FileValidator[];
}

@Injectable()
export class ParseFilePipe implements PipeTransform {
    constructor(private options: ParseFileOptions = {}) {

    }
    async transform(value: any, metadata: ArgumentMetadata) {
        //如果输入的文件为空，则抛出异常，提示没有提交文件
        if (!value) {
            throw new BadRequestException('No file submitted');
        }
        if(this.options.validators){
            for(const validator of this.options.validators){
                await validator.isValid(value);
            }
        }
        return value;
    }

}