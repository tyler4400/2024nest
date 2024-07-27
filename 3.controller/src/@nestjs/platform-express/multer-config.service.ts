import {Injectable,Inject} from '@nestjs/common';
import {MULTER_MODULE_OPTIONS} from './contants';
import multer from 'multer';
import { MulterModuleOptions } from "./multer-options.interface";
@Injectable()
export class MulterConfigService{
    constructor(
        @Inject(MULTER_MODULE_OPTIONS) private options:MulterModuleOptions
    ){}
    getMulterInstance(){
        return multer(this.options);
    }
}