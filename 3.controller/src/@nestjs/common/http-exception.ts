import { HttpStatus } from "./http-status.enum";
export class HttpException extends Error{
    private readonly response:string|object
    private readonly status:HttpStatus
    constructor( response:string|object,status:HttpStatus){
        super();
        this.response=response;
        this.status=status;
    }
    getResponse(){
        return this.response;
    }
    getStatus(){
        return this.status;
    }
}
export class BadRequestException extends HttpException{
    constructor(message,error?){
        super({message,error,statusCode:HttpStatus.BAD_REQUEST},HttpStatus.BAD_REQUEST)
    }
}
export class ForbiddenException extends HttpException{
    constructor(message,error?){
        super({message,error,statusCode:HttpStatus.FORBIDDEN},HttpStatus.FORBIDDEN)
    }
}
export class BadGatewayException extends HttpException{
    constructor(message?,error?){
        super({message:message??'Bad Gateway',error,statusCode:HttpStatus.BAD_GATEWAY},HttpStatus.BAD_GATEWAY)
    }
}
export class RequestTimeoutException extends HttpException{
    constructor(message?,error?){
        super({message:message??'Request Timeout',error,statusCode:HttpStatus.REQUEST_TIMEOUT},HttpStatus.REQUEST_TIMEOUT)
    }
}