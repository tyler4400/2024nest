"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalHttpExectionFilter = void 0;
const common_1 = require("@nestjs/common");
class GlobalHttpExectionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (response.headersSent) {
            return;
        }
        if (exception instanceof common_1.HttpException) {
            if (typeof exception.getResponse() === 'string') {
                const status = exception.getStatus();
                response.status(status).json({
                    statusCode: status,
                    message: exception.getResponse()
                });
            }
            else {
                response.status(exception.getStatus()).json(exception.getResponse());
            }
        }
        else {
            return response.status(500).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: exception.message,
                message: "Internal server error"
            });
        }
    }
}
exports.GlobalHttpExectionFilter = GlobalHttpExectionFilter;
//# sourceMappingURL=http-exception.filter.js.map