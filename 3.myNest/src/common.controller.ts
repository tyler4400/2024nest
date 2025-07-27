import { Controller, Get } from '@nest/common'
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {

	constructor(
		private commonService: CommonService
	) {

	}

	@Get('common-service')
	common() {
		const aa = this.commonService.log('hello');
		return { code: 0, data: aa };
	}
}
