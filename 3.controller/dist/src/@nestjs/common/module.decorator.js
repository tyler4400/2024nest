"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Global = exports.defineModule = exports.Module = void 0;
require("reflect-metadata");
function Module(metadata) {
    return (target) => {
        Reflect.defineMetadata('isModule', true, target);
        defineModule(target, metadata.controllers);
        Reflect.defineMetadata('controllers', metadata.controllers, target);
        defineModule(target, (metadata.providers ?? []).map(provider => provider instanceof Function ? provider : provider.useClass)
            .filter(Boolean));
        Reflect.defineMetadata('providers', metadata.providers, target);
        Reflect.defineMetadata('exports', metadata.exports, target);
        Reflect.defineMetadata('imports', metadata.imports, target);
    };
}
exports.Module = Module;
function defineModule(nestModule, targets = []) {
    targets.forEach(target => {
        Reflect.defineMetadata('module', nestModule, target);
    });
}
exports.defineModule = defineModule;
function Global() {
    return (target) => {
        Reflect.defineMetadata('global', true, target);
    };
}
exports.Global = Global;
//# sourceMappingURL=module.decorator.js.map