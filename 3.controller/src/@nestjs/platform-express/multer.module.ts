import { DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { MulterModuleOptions } from "./multer-options.interface";
import {MulterConfigService} from './multer-config.service';
import {MULTER_MODULE_OPTIONS} from './contants';
@Module({})
export class MulterModule{
    static register(options:MulterModuleOptions):DynamicModule{
        return {
            module:MulterModule,
            providers:[
                {
                    provide:MULTER_MODULE_OPTIONS,
                    useValue:options
                },
                MulterConfigService,
            ],
            exports:[MulterConfigService]
        }
    }
}