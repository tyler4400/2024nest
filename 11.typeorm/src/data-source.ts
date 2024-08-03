
import {DataSource} from 'typeorm';
import {User} from './entity/User';
import {Order} from './entity/Order';
export const AppDataSource = new DataSource({
      type:'mysql',//数据库的类型是mysql
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'orm',
      synchronize:true,//是否自动同步实体与数据库的表结构，开发时为true,上线后为false
      logging:true,//是否启动日志
      entities:[User,Order],
      //entities:["entity/*.ts"]//实体类数组，指的是要用到的实体
})