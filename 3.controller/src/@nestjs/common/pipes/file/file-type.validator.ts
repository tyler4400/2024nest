import { BadRequestException } from "@nestjs/common";
import { FileValidator } from "./file-validator";

export class FileTypeValidator extends FileValidator{
    isValid(file?: any): boolean | Promise<boolean> {
       if(file.mimeType !== this.validationOptions.fileType){
        throw new BadRequestException(`Validation failed (expected type is ${this.validationOptions.fileType})`);
       }
       return true;
    }
}