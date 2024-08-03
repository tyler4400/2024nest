import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,OneToOne, OneToMany} from 'typeorm'
import { Order } from './Order'
//使用Entity可以将User类标识为一个实体，并可以通过name属性指定表名
@Entity()//一个实体对应数据库里一张表
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
  @OneToMany(()=>Order,(order)=>order.user)
  orders:Order[]
}