import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import {Repository} from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";

@Injectable()
export class UserService extends MySQLBaseService<User> {
  constructor(
    @InjectRepository(User) protected repository:Repository<User>
  ){
    super(repository);
  }
}