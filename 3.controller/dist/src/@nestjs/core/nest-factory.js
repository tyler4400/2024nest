"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestFactory = void 0;
const nest_application_1 = require("./nest-application");
const logger_1 = require("./logger");
class NestFactory {
    static async create(module) {
        logger_1.Logger.log('Starting Nest application...', 'NestFactory');
        const app = new nest_application_1.NestApplication(module);
        return app;
    }
}
exports.NestFactory = NestFactory;
//# sourceMappingURL=nest-factory.js.map