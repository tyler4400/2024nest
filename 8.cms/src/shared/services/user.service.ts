import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import {Role} from '../entities/role.entity';
import {Repository,Like,In} from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";
import { UpdateUserRolesDto } from "../dto/user.dto";
@Injectable()
export class UserService extends MySQLBaseService<User> {
  constructor(
    @InjectRepository(User) protected repository:Repository<User>,
    @InjectRepository(Role) protected roleRepository:Repository<Role>
  ){
    super(repository);
  }
  async findAll(keyword?:string) {
    const  where = keyword?[
      {username:Like(`%${keyword}%`)},
      {email:Like(`%${keyword}%`)}
    ]:{}
    return this.repository.find({where});
  }
  async findAllWithPagination(page:number, limit:number, keyword?:string) {
    const  where = keyword?[
      {username:Like(`%${keyword}%`)},
      {email:Like(`%${keyword}%`)}
    ]:{}

    const [users,total] = await this.repository.findAndCount({
      where,
      skip:(page-1)*limit,
      take:limit
    });
    return {users,total}
  }
  async updateRoles(id:number,updateUserRolesDto: UpdateUserRolesDto){
    const user = await this.repository.findOneBy({id});
    const roles = await this.roleRepository.findBy({id:In(updateUserRolesDto.roleIds)});
    user.roles = roles;
    await this.repository.save(user);
  }
}