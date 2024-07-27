import {PipeTransform,ArgumentMetadata, Injectable} from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform{
    transform(value: string,metadata: ArgumentMetadata) {
       console.log(`value:${value}`);
       console.log(JSON.stringify(metadata));
       return value;
    }
}