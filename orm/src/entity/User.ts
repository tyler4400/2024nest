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