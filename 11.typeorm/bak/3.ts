import { AppDataSource } from "./data-source";
import {User} from './entity/User';
//初始化数据源
AppDataSource.initialize().then(async ()=>{
   //select user.firstName,user.lastName from user;
   //创建一个针对User实合格的查询 构建器，并将该实体命名为user
   const queryBuilder = AppDataSource.manager.createQueryBuilder();
   //选择查询中返回的字段
   queryBuilder.select(['user.firstName','user.lastName']);
   //添加更多的字段
   queryBuilder.addSelect('user.age');
   //指定查询的主表
   queryBuilder.from(User,'user')
   //通过where指定查询条件
   queryBuilder.where("user.id = :id",{id:2});
   //还可以添加额外的条件
   queryBuilder.andWhere('user.isActive=:isActive',{isActive:true});
   //指定要返回一条还是多条
   const user = await queryBuilder.getOne();
   const users = await queryBuilder.getMany();
   console.log('user',user);
   console.log('users',users);


   await queryBuilder.delete().from(User).where('id=:id',{id:2}).execute();
})