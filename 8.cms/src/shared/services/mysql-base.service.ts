import { Injectable } from "@nestjs/common";;
import {Repository} from 'typeorm';

@Injectable()
export abstract class MySQLBaseService<T> {
  constructor(protected repository:Repository<T>){}
  async findAll(){
    return this.repository.find();
  }
}