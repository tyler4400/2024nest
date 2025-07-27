
import { Module } from '@nest/common';
import { CommonModule } from './common.module';
import { UseValueService } from "./logger.service";
@Module({
	imports:[CommonModule],
	providers:[
		{
			provide: 'coreModule-provider',//这是一个token，也称为标志 ，或者说令牌，也就是provider的名字
			useValue: new UseValueService('module和provider一起导出')
		}
	],
	exports:[CommonModule, 'coreModule-provider']//把导入的CommonModule重新向外导出
})
export class CoreModule{

}
