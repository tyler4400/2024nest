import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from 'typeorm'
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
}