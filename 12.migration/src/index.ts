import { AppDataSource } from "./data-source";
import {Role} from './entity/Role';
AppDataSource.initialize().then(async ()=>{
    console.log('initialize')
    const role = new Role();
    role.name = 'Admin';
    await AppDataSource.manager.save(role);
})
.catch(error=>console.log(error))
.finally(()=>process.exit(0))