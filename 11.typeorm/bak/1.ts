import { AppDataSource } from "./data-source";
import {User} from './entity/User';

//初始化数据源
AppDataSource.initialize().then(async ()=>{
    //保存一个新用户
    const user = new User();
    user.firstName='zhang';
    user.lastName='san';
    user.age = 18
    user.email = 'zhangsan@qq.com';
    user.isActive=true;
    await AppDataSource.manager.save(user);//insert
    console.log('用户已经保存',user)
    //查询一个用户
    const foundUser = await AppDataSource.manager.findOne(User,{//select
        where:{id:user.id}
    });
    console.log('找到用户',foundUser)
    //更新用户
    if(foundUser){
        foundUser.age = 28;
        await AppDataSource.manager.save(foundUser);//update
        console.log('用户已经更新',foundUser)
    }
    if(foundUser){
        await AppDataSource.manager.remove(foundUser);//delete
        console.log('用户已经被删除',foundUser)
    }
})