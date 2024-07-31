import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';
//实体会映射为数据库里的一张表
@Entity()
export class User{
    @PrimaryGeneratedColumn()//自增的主键列
    id:number
    @Column({length:50,unique:true})
    username:string
    @Column()
    password:string
    @Column({length:15,nullable:true})
    mobile:string
    @Column({length:100,nullable:true})
    email:string
    @Column({default:1})//是否生效 0表示无效，1表示有效
    status:number
    @Column({default:false})
    is_super:boolean //是否是超级管理员
    @Column({default:100})
    sort:number //排序编号
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
    updatedAt:Date
}