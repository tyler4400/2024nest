import {Entity,Column,PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from 'typeorm'
@Entity()
@Tree("nested-set")
export class Category{
  @PrimaryGeneratedColumn()
  id:number
  @Column({length:50})
  name:string
  @TreeChildren()
  children:Category[]
  @TreeParent()
  parent:Category;
}