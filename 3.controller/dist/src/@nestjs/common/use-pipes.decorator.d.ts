import 'reflect-metadata';
import { PipeTransform } from './pipe-transform.interface';
export declare function UsePipes(...pipes: PipeTransform[]): (target: object | Function, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) => void;
