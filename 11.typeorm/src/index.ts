import { AppDataSource } from "./data-source";
import {User} from './entity/User';
import {Order} from './entity/Order';
//查询至少买过一个商品的用户
AppDataSource.initialize().then(async ()=>{
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.createQueryBuilder('user')
      .where(qb=>{
         const subQuery = qb.subQuery()
         .select('order.userId')
         .from(Order,'order')
         .getQuery()
         return `user.id IN `+subQuery
      })
      .getMany();
  console.log(users)
}).finally(()=>process.exit(9))
//select * from user where user.id in (select `order`.userId from `order`)
/**
SELECT `user`.`firstName` AS `user_firstName`,
 `user`.`lastName` AS `user_lastName`,
  SUM(`order`.`amount`) AS `totalAmount`
   FROM `user` `user` INNER JOIN `order` `order` ON `order`.`userId`=`user`.`id` 
   WHERE `user`.`isActive`=1 
   AND `order`.`product`='Product1' GROUP BY `user`.`id` ORDER BY totalAmount DESC
 */