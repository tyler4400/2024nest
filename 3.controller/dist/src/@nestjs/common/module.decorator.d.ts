import 'reflect-metadata';
interface ModuleMetadata {
    controllers?: Function[];
    providers?: any[];
    exports?: any[];
    imports?: any[];
}
export declare function Module(metadata: ModuleMetadata): ClassDecorator;
export declare function defineModule(nestModule: any, targets?: any[]): void;
export declare function Global(): (target: Function) => void;
export interface DynamicModule extends ModuleMetadata {
    module: Function;
}
export {};
