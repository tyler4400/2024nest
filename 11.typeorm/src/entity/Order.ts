import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, ManyToOne} from 'typeorm'
import { User } from './User'
@Entity()
export class Order{
  @PrimaryGeneratedColumn()
  id:number
  @Column()
  product:string
  @Column()
  amount:number
  @CreateDateColumn()
  createdAt:Date
  @UpdateDateColumn()
  updatedAt:Date
  @ManyToOne(()=>User,user=>user.orders)
  user:User
}