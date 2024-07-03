
import {Module} from '@nestjs/common';
import { CommonModule } from './common.module';
@Module({
   imports:[CommonModule],
   exports:[CommonModule]//把导入的CommonModule重新向外导出
})
export class CoreModule{

}