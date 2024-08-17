// 引入 reflect-metadata 库，为 TypeORM 启用反射支持
import "reflect-metadata"
// 从 typeorm 模块中导入 DataSource 类
import { DataSource } from "typeorm"
// 从 ./entity/User 模块中导入 User 实体
//import { User } from "./entity/User"
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
    entities: ["**/entity/*.ts"],
})