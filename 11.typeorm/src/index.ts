import { AppDataSource } from "./data-source";
import {User} from './entity/User';
import {Profile} from './entity/Profile';
AppDataSource.initialize().then(async ()=>{
   const newUser = new User();
   newUser.firstName='2';
   newUser.lastName='2';
   newUser.age=1;
   newUser.email='2@qq.com';
   //await AppDataSource.manager.save(newUser);

   const newPofile = new Profile();
   newPofile.bio = '2的个人介绍';
   newPofile.user=newUser;
   await AppDataSource.manager.save(newPofile);
})