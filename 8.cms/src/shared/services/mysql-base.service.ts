import { Injectable } from "@nestjs/common";;
import { Repository, FindOneOptions } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
@Injectable()
export abstract class MySQLBaseService<T> {
  constructor(protected repository: Repository<T>) { }
  async findAll() {
    return this.repository.find();
  }
  async findOne(options: FindOneOptions<T>) {
    return this.repository.findOne(options);
  }
  async create(createDto: DeepPartial<T>) {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity);
  }
  async update(id: number, updateDto: QueryDeepPartialEntity<T>) {
    return this.repository.update(id, updateDto);
  }
  async delete(id: number) {
    return this.repository.delete(id);
  }
  async count(){
    return this.repository.count();
  }
  async findLatest(take:number){
    const order:any = {
      id:'DESC'
    }
    return this.repository.find({
      order,
      take
    });
  }
  async getTrend(tableName:string){
    const result = await this.repository.query(`
       SELECT DATE_FORMAT(createdAt,'%Y-%m-%d') as date,COUNT(*) as count
      FROM ${tableName}
      GROUP BY date
      ORDER BY date ASC
    `)
   const dates = result.map(row=>row.date);
   const counts = result.map(row=>row.count); 
   return {dates,counts}
  }
}
/**
 * repository.create 并不是保存用户数据的意思，而是创建一个新的实体
 * Creates a new entity instance and copies all entity properties from this object into a new entity
 * create 
 * insert 插入 update是更新 save可以保存并更新
 * create只是把一个普通的对象变成一个实体，并不会操作数据库
 */