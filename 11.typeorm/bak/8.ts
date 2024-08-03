import { AppDataSource } from "./data-source";
import {User} from './entity/User';
import {Order} from './entity/Order';
AppDataSource.initialize().then(async ()=>{
   const user1 = new User();
   user1.firstName = 'zhang';
   user1.lastName = 'san';
   user1.age = 18;
   user1.email = 'zhang@qq.com';
   user1.isActive=true;
   await AppDataSource.manager.save(user1);

   const order1  = new Order();
   order1.product = 'Product1';
   order1.amount = 1;
   order1.user = user1;
   await AppDataSource.manager.save(order1);

   const order2  = new Order();
   order2.product = 'Product1';
   order2.amount = 2;
   order2.user = user1;
   await AppDataSource.manager.save(order2);

   const order3  = new Order();
   order3.product = 'Product2';
   order3.amount = 3;
   order3.user = user1;
   await AppDataSource.manager.save(order3);

   const queryBuilder = AppDataSource.manager.createQueryBuilder(User,'user');
   const query = queryBuilder
   .select(['user.firstName'])
   .addSelect('user.lastName')
   .addSelect('SUM(order.amount)','totalAmount')//汇总订单总数量
   .innerJoin('user.orders','order')//用户表内连接订单表
   .where('user.isActive=:isActive',{isActive:true})
   .andWhere('order.product=:product',{product:'Product1'})
   .groupBy('user.id')//按用户的ID进行分组
   .orderBy('totalAmount','DESC')//按订单的商品总数量进行倒序排列
   const result = await query.getRawMany();
   console.log(result)
// zhang  san  3
}).finally(()=>process.exit(9))
/**
SELECT `user`.`firstName` AS `user_firstName`,
 `user`.`lastName` AS `user_lastName`,
  SUM(`order`.`amount`) AS `totalAmount`
   FROM `user` `user` INNER JOIN `order` `order` ON `order`.`userId`=`user`.`id` 
   WHERE `user`.`isActive`=1 
   AND `order`.`product`='Product1' GROUP BY `user`.`id` ORDER BY totalAmount DESC
 */