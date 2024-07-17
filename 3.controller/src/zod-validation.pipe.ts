import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform{
    constructor(private schema:ZodSchema){

    }
    transform(value: any, metadata: ArgumentMetadata) {
       try{
        //value是传进来的值，使用zodSchema进行解析和验证，如果通过则返回解析后的值
        return this.schema.parse(value);
       }catch(error){
        //如果解析失败，则抛出异常
        throw new BadRequestException('Validatiion failed');
       }
    }
    
}