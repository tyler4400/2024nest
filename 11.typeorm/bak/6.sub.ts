import { AppDataSource } from "./data-source";
import {User} from './entity/User';
//初始化数据源
AppDataSource.initialize().then(async ()=>{
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.createQueryBuilder('user')
    .where(qb =>{
        const subQuery = qb.subQuery()
        .select('post.userId')
        .from(Post,'post')
        .getQuery();
        return 'user.id IN '+ subQuery;
    })
    .getMany();
    console.log('users',users)
})