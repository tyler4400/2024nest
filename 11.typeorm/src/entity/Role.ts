import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,ManyToMany} from 'typeorm'
import { User } from './User'
@Entity()
export class Role{
  @PrimaryGeneratedColumn()
  id:number
  @Column({length:50})
  name:string
  @CreateDateColumn()
  createdAt:Date
  @UpdateDateColumn()
  updatedAt:Date

  @ManyToMany(()=>User,(user)=>user.roles,{
    createForeignKeyConstraints:false
  })

  users:User[]
}