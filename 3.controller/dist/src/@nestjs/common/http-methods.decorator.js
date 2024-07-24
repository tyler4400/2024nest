"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = exports.HttpCode = exports.Redirect = exports.Post = exports.Get = void 0;
require("reflect-metadata");
function Get(path = '') {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('path', path, descriptor.value);
        Reflect.defineMetadata('method', 'GET', descriptor.value);
    };
}
exports.Get = Get;
function Post(path = '') {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('path', path, descriptor.value);
        Reflect.defineMetadata('method', 'POST', descriptor.value);
    };
}
exports.Post = Post;
function Redirect(url = '/', statusCode = 302) {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('redirectUrl', url, descriptor.value);
        Reflect.defineMetadata('redirectStatusCode', statusCode, descriptor.value);
    };
}
exports.Redirect = Redirect;
function HttpCode(statusCode = 200) {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('statusCode', statusCode, descriptor.value);
    };
}
exports.HttpCode = HttpCode;
function Header(name, value) {
    return (target, propertyKey, descriptor) => {
        const existingHeaders = Reflect.getMetadata(`headers`, descriptor.value) ?? [];
        existingHeaders.push({ name, value });
        Reflect.defineMetadata('headers', existingHeaders, descriptor.value);
    };
}
exports.Header = Header;
//# sourceMappingURL=http-methods.decorator.js.map