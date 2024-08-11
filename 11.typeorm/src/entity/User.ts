import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,ManyToMany, JoinTable} from 'typeorm'
import { Role } from './Role'
@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id:number
  @Column({length:50})
  firstName:string
  @Column({length:50})
  lastName:string
  @Column({type:'int'})
  age:number
  @Column({nullable:true,unique:false})
  email:string
  @Column({type:'boolean',default:false})
  isActive:boolean
  @CreateDateColumn()
  createdAt:Date
  @UpdateDateColumn()
  updatedAt:Date
  @ManyToMany(()=>Role,(role)=>role.users,{
    cascade:true
  })
  @JoinTable()//role_users_user
  //@JoinTable()//user_roles_role  role_users_user   User表名_roles属性名_Role表名
  roles:Role[]
}