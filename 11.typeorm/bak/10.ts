import { AppDataSource } from "./data-source";
import {User} from './entity/User';
import {Role} from './entity/Role';
AppDataSource.initialize().then(async ()=>{
 const userRepository = AppDataSource.getRepository(User);
 const roleRepository = AppDataSource.getRepository(Role);

 const role1 = new Role();
 role1.name = 'Admin';
 //await roleRepository.save(role1);

 const role2 = new Role();
 role2.name = 'User';
 //await roleRepository.save(role2);

 const user1 = new User();
 user1.firstName = 'li';
 user1.lastName = 'si';
 user1.age = 18;
 user1.email= 'zhangsan@qq.com';
 user1.roles = [role1,role2]
 await userRepository.save(user1);


}).finally(()=>process.exit(9))
