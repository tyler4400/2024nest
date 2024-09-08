import { Injectable } from '@nestjs/common';
import { MongodbBaseService } from './mongodb-base.service';
import {Model} from 'mongoose';
import { SettingDocument,Setting } from '../schemas/setting.schema';
import {CreateSettingDto,UpdateSettingDto} from '../dto/setting.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SettingService extends MongodbBaseService<
SettingDocument,CreateSettingDto,UpdateSettingDto>{
    constructor(
        @InjectModel(Setting.name) settingModel:Model<SettingDocument>
    ){
        super(settingModel);
    }
    async findFirst(){
        return this.model.findOne().exec();
    }

}
