// 从 data-source 模块中导入 AppDataSource
import { AppDataSource } from "./data-source"
// 从 entity/User 模块中导入 User 实体
import { User } from "./entity/User"
// 初始化数据源
AppDataSource.initialize().then(async () => {
    // 保存一个新用户
    const user = new User()
    user.firstName = "John"
    user.lastName = "Doe"
    user.age = 25
    user.email = "john.doe@example.com"
    user.isActive = true
    await AppDataSource.manager.save(user)
}).catch(error => console.log(error))
    .finally(() => process.exit(0))