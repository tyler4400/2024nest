import { BadRequestException } from "@nestjs/common";
import { FileValidator } from "./file-validator";

export class MaxFileSizeValidator extends FileValidator{
    isValid(file?: any): boolean | Promise<boolean> {
       if(file.size > this.validationOptions.maxSize){
        throw new BadRequestException(`Validation failed (expected size is less than ${(this.validationOptions.maxSize/1024/1024).toFixed(2)}M)`);
       }
       return true;
    }
}