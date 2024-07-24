import { HttpStatus } from "./http-status.enum";
export declare class HttpException extends Error {
    private readonly response;
    private readonly status;
    constructor(response: string | object, status: HttpStatus);
    getResponse(): string | object;
    getStatus(): HttpStatus;
}
export declare class BadRequestException extends HttpException {
    constructor(message: any, error?: any);
}
export declare class ForbiddenException extends HttpException {
    constructor(message: any, error?: any);
}
export declare class BadGateWayException extends HttpException {
    constructor(message: any, error?: any);
}
export declare class RequestTimeoutException extends HttpException {
    constructor(message: any, error?: any);
}
