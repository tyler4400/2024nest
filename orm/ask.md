修改下面的代码，如何在entities里面配置通配符
要求如下
1.回答用中文
2.输出修改的代码，没有修改的代码不用输出

src/data-source.ts
```js
// 引入 reflect-metadata 库，为 TypeORM 启用反射支持
import "reflect-metadata"
// 从 typeorm 模块中导入 DataSource 类
import { DataSource } from "typeorm"
// 从 ./entity/User 模块中导入 User 实体
import { User } from "./entity/User"
// 创建并导出一个新的 DataSource 实例，配置数据库连接信息
export const AppDataSource = new DataSource({
    type: "mysql",        // 数据库类型为 MySQL
    host: "localhost",    // 数据库主机名
    port: 3306,           // 数据库端口号
    username: "root",     // 数据库用户名
    password: "root",     // 数据库用户密码
    database: "orm",      // 数据库名称
    synchronize: true,    // 是否自动同步实体与数据库表结构
    logging: true,        // 是否启用日志记录
    entities: [], // 实体类文件路径
})
```

src/entity/User.ts
```js
// 从 typeorm 模块中导入 Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn 装饰器
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
// 使用 @Entity 装饰器将 User 类标记为一个数据库表，并指定表名为 "users"
@Entity({
    name: "users"
})
export class User {
    // 使用 @PrimaryGeneratedColumn 装饰器将 id 属性标记为主键并自动生成，并添加注释 "Primary key"
    @PrimaryGeneratedColumn({ comment: "Primary key" })
    id: number
    // 使用 @Column 装饰器将 firstName 属性标记为数据库表中的一列，限制长度为 50
    @Column({ length: 50 })
    firstName: string
    // 使用 @Column 装饰器将 lastName 属性标记为数据库表中的一列，限制长度为 50
    @Column({ length: 50 })
    lastName: string
    // 使用 @Column 装饰器将 age 属性标记为数据库表中的一列，类型为 "int"
    @Column({ type: "int" })
    age: number
    // 使用 @Column 装饰器将 email 属性标记为数据库表中的一列，要求唯一且不允许为空
    @Column({ unique: false, nullable: false })
    email: string
    // 使用 @Column 装饰器将 isActive 属性标记为数据库表中的一列，类型为 "boolean"，默认值为 true
    @Column({ type: "boolean", default: true })
    isActive: boolean
    // 使用 @CreateDateColumn 装饰器将 createdAt 属性标记为创建时间列
    @CreateDateColumn()
    createdAt: Date
    // 使用 @UpdateDateColumn 装饰器将 updatedAt 属性标记为更新时间列
    @UpdateDateColumn()
    updatedAt: Date
}
```

src/index.ts
```js
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
```

