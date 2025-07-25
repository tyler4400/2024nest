import { Inject, Injectable } from '@nest/common';

@Injectable()
export class LoggerClassService{
	log(message){
		console.log('LoggerClassService', message)
		return ('LoggerClassService: ' + message)
	}
}
@Injectable()
export class LoggerService{
	constructor(@Inject('SUFFIX') private suffix: string){
		console.log('LoggerService', this.suffix)
	}
	log(message){
		console.log('LoggerService', message)
		return ('LoggerService: ' + message)
	}
}

@Injectable()
export class UseValueService{
	constructor(private prefix: string){
		console.log('UseValueService', prefix)
	}
	log(message){
		console.log('UseValueService', message)
		return ('UseValueService: ' + this.prefix + ',' + message)
	}
}

@Injectable()
export class UseFactory{
	constructor(private prefix1: string, private suffix: string){
		console.log('UseFactory', prefix1, suffix)
	}
	log(message){
		console.log('UseFactory', this.suffix)
		return ('UseFactory: ' + this.prefix1 + ' ' + this.suffix + ' ' + message)
	}
}
