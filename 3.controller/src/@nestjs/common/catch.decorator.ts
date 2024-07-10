import 'reflect-metadata';
export function Catch(...exceptions):ClassDecorator{
    return (target:Function)=>{
        Reflect.defineMetadata('catch',exceptions,target);
    }
}