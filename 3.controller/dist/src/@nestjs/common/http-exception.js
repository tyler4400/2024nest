"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTimeoutException = exports.BadGateWayException = exports.ForbiddenException = exports.BadRequestException = exports.HttpException = void 0;
const http_status_enum_1 = require("./http-status.enum");
class HttpException extends Error {
    constructor(response, status) {
        super();
        this.response = response;
        this.status = status;
    }
    getResponse() {
        return this.response;
    }
    getStatus() {
        return this.status;
    }
}
exports.HttpException = HttpException;
class BadRequestException extends HttpException {
    constructor(message, error) {
        super({ message, error, statusCode: http_status_enum_1.HttpStatus.BAD_REQUEST }, http_status_enum_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestException = BadRequestException;
class ForbiddenException extends HttpException {
    constructor(message, error) {
        super({ message, error, statusCode: http_status_enum_1.HttpStatus.FORBIDDEN }, http_status_enum_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
class BadGateWayException extends HttpException {
    constructor(message, error) {
        super({ message, error, statusCode: http_status_enum_1.HttpStatus.BAD_GATEWAY }, http_status_enum_1.HttpStatus.BAD_GATEWAY);
    }
}
exports.BadGateWayException = BadGateWayException;
class RequestTimeoutException extends HttpException {
    constructor(message, error) {
        super({ message, error, statusCode: http_status_enum_1.HttpStatus.REQUEST_TIMEOUT }, http_status_enum_1.HttpStatus.REQUEST_TIMEOUT);
    }
}
exports.RequestTimeoutException = RequestTimeoutException;
//# sourceMappingURL=http-exception.js.map