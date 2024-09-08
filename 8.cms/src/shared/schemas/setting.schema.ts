import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//导出网站设置文档的类型
export type SettingDocument = HydratedDocument<Setting>
@Schema()
export class Setting{
    id:string;

    @Prop({required:true})
    siteName:string;

    @Prop()
    siteDescription:string;

    @Prop()
    contactEmail:string
}
//通过工厂方法创建Schema
export const SettingSchema = SchemaFactory.createForClass(Setting)
//因为在mongodb里，每个保存的文档都会有一个_id字段，给客户端发送的希望是id
SettingSchema.virtual('id').get(function(){
    return this._id.toHexString();//通过_id得到id的值
});
//我们使用mongoose从数据库里查出来的对象是SettingDocument类型
//当我们这个数据发给客户端的时候，需要调用toJSON\toObject转成普通JSON或普通的JS对象
//转换的时候是否需要转换虚拟属性
SettingSchema.set('toJSON',{virtuals:true});
SettingSchema.set('toObject',{virtuals:true});