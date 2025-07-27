import { Injectable } from '@nest/common';

@Injectable()
export class CommonService {

	log(message: string){
		console.log('CommonService', message)
		return 'CommonService'
	}
}
