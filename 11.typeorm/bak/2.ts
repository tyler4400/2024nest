import { AppDataSource } from "./data-source";
import {User} from './entity/User';

//初始化数据源
AppDataSource.initialize().then(async ()=>{
   const users = [
    {firstName:'1',lastName:'1',age:1,email:'1@qq.com'},
    {firstName:'2',lastName:'2',age:3,email:'2@qq.com'}
   ]
   await AppDataSource.manager.insert(User,users);
   console.log(`批量插入用户数组`,users);
   //查询并计数
   const [allUsers,userCount] = await AppDataSource.manager.findAndCount(User);
   console.log(`allUsers`,allUsers);
   console.log(`userCount`,userCount);
   const singleUser1 = await AppDataSource.manager.findOne(User,{where:{email:'2@qq.com'}});
   console.log(`singleUser1`,singleUser1);
   const singleUser2 = await AppDataSource.manager.findOneBy(User,{email:'2@qq.com'});
   console.log(`singleUser2`,singleUser2);

   try{
    const userOrFail = await AppDataSource.manager.findOneOrFail(User,{where:{email:'3@qq.com'}});
    console.log('找到用户',userOrFail)
   }catch(error){
    console.log('未找到用户',error)
   }
})