import { Module } from '@nest/common';
import { CommonService } from './common.service';
@Module({
	providers: [CommonService],
	exports: [CommonService]
})
export class CommonModule {

}
