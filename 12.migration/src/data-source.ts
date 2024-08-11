import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {Role} from './entity/Role'
export const AppDataSource = new DataSource({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'root',
    database:'orm',
    synchronize:false,
    logging:false,
    entities:[Role],
    migrations:['./src/migrations/*.ts'],
    connectorPackage:'mysql2'
})