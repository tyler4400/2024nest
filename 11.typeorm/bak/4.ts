import { AppDataSource } from "./data-source";
import {User} from './entity/User';
//初始化数据源
AppDataSource.initialize().then(async ()=>{
   const queryBuilder = AppDataSource.manager.createQueryBuilder();
   //插入三条数据
   await queryBuilder.insert().into(User).values(
      [
        {firstName:'1',lastName:'1',age:1,email:'1@qq.com'},
        {firstName:'2',lastName:'2',age:2,email:'2@qq.com'},
        {firstName:'3',lastName:'3',age:3,email:'3@qq.com'}
      ]
   ).execute();

   const results = await queryBuilder.select('user').from(User,'user').where('user.id>:id',{id:1}).getMany();
   console.log('users',results)

   await queryBuilder.update(User).set({age:30}).where('email=:email',{email:'3@qq.com'}).execute();

   await queryBuilder.delete().from(User).where('id=:id',{id:4}).execute()

})