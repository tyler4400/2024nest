declare class User {
    name: string;
    age: number;
}
declare const plainUser: {
    name: string;
    age: number;
};
declare const user: any;
declare const plainObject: any;
declare function plainToInstance(Clazz: any, obj: any): any;
declare function instanceToPlain(instance: any): any;
