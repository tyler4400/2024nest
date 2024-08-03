import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn} from 'typeorm'
import { User } from './User'
@Entity()
export class Profile{
  @PrimaryGeneratedColumn()
  id:number
  @Column({type:'text'})
  bio:string
  @CreateDateColumn()
  createdAt:Date
  @UpdateDateColumn()
  updatedAt:Date
  @OneToOne(()=>User,(user)=>user.profile,{
    cascade:true,
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  @JoinColumn()
  user:User
}
// user 1  profile userid=1
//主表 子表
//主键  外键
//user id 主键 主键所在的表就是主表
//这个字段是别的表的主键，它就是外键，就是子表 ,外键所在的表就是子表
