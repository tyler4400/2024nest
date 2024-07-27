import { ArgumentMetadata, Inject, PipeTransform } from "@nestjs/common";
export class MyPipe implements PipeTransform{
    constructor(@Inject('PREFIX') private prefix:string){
        console.log('prefix',this.prefix)
    }
    transform(value: any, metadata: ArgumentMetadata) {
        console.log('prefix',this.prefix)
       return this.prefix + "-"+value;
    }
    
}