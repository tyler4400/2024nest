import 'reflect-metadata';
interface ControllerOptions {
    prefix?: string;
}
export declare function Controller(): ClassDecorator;
export declare function Controller(prefix: string): ClassDecorator;
export declare function Controller(options: ControllerOptions): ClassDecorator;
export {};
