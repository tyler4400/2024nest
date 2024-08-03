import { AppDataSource } from "./data-source";
import {User} from './entity/User';
//初始化数据源
AppDataSource.initialize().then(async ()=>{
   //获取User实体的存储仓库
   const userRepository = AppDataSource.getRepository(User);
   const user = new User();
   user.firstName='zhang';
   user.lastName='san';
   user.age = 18
   user.email = 'zhangsan@qq.com';
   user.isActive=true;
   await userRepository.save(user);

   const users = await userRepository.find();
   console.log('users',users);

   const foundUser = await userRepository.findOne({where:{id:5}});
   console.log('foundUser',foundUser);
   foundUser.age = 100;
   //更新用户
   await userRepository.save(foundUser);
  await userRepository.remove(foundUser)
})