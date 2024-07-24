import { CreateCatDto } from './create-cat.dto';
import { CreateUserDto } from './create-user.dto';
export declare class AppController {
    getHello(id: string): string;
    getNumber(id: number): string;
    getFloat(value: number): string;
    getBool(flag: boolean): string;
    getArray(values: string[]): string;
    getUUID(id: string): string;
    getRole(role: string): string;
    getDefault(username: string): string;
    getCustom(value: string, age: number): string;
    createCat(createCatDto: CreateCatDto): Promise<string>;
    createUser(createUserDto: CreateUserDto): Promise<string>;
}
