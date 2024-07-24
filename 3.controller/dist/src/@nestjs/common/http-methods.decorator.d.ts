import 'reflect-metadata';
export declare function Get(path?: string): MethodDecorator;
export declare function Post(path?: string): MethodDecorator;
export declare function Redirect(url?: string, statusCode?: number): MethodDecorator;
export declare function HttpCode(statusCode?: number): MethodDecorator;
export declare function Header(name: string, value: string): MethodDecorator;
