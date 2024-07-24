"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Next = exports.Res = exports.Response = exports.Body = exports.Param = exports.Ip = exports.Session = exports.Headers = exports.Query = exports.Req = exports.Request = exports.createParamDecorator = void 0;
require("reflect-metadata");
const createParamDecorator = (keyOrFactory) => {
    return (data, ...pipes) => (target, propertyKey, parameterIndex) => {
        const existingParameters = Reflect.getMetadata(`params`, target, propertyKey) ?? [];
        const metatype = Reflect.getMetadata('design:paramtypes', target, propertyKey)[parameterIndex];
        if (keyOrFactory instanceof Function) {
            existingParameters[parameterIndex] = { parameterIndex, key: 'DecoratorFactory', factory: keyOrFactory, data, pipes, metatype };
        }
        else {
            existingParameters[parameterIndex] = { parameterIndex, key: keyOrFactory, data, pipes, metatype };
        }
        Reflect.defineMetadata(`params`, existingParameters, target, propertyKey);
    };
};
exports.createParamDecorator = createParamDecorator;
exports.Request = (0, exports.createParamDecorator)('Request');
exports.Req = (0, exports.createParamDecorator)('Req');
exports.Query = (0, exports.createParamDecorator)('Query');
exports.Headers = (0, exports.createParamDecorator)('Headers');
exports.Session = (0, exports.createParamDecorator)('Session');
exports.Ip = (0, exports.createParamDecorator)('Ip');
exports.Param = (0, exports.createParamDecorator)('Param');
exports.Body = (0, exports.createParamDecorator)('Body');
exports.Response = (0, exports.createParamDecorator)('Response');
exports.Res = (0, exports.createParamDecorator)('Res');
exports.Next = (0, exports.createParamDecorator)('Next');
//# sourceMappingURL=param.decorator.js.map