import 'reflect-metadata';
export declare class Reflector {
    get(metadataKey: any, target: any, key?: any): any;
    static createDecorator(): (metadataValue: any) => (target: object | Function, propertyKey?: string, descriptor?: any) => void;
}
