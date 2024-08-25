import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../entities/role.entity";
import { Repository, Like } from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";

@Injectable()
export class RoleService extends MySQLBaseService<Role> {
  constructor(
    @InjectRepository(Role) protected repository: Repository<Role>
  ) {
    super(repository);
  }

  async findAll(keyword?: string) {
    const where = keyword ? [
      { name: Like(`%${keyword}%`) }
    ] : {};
    return this.repository.find({ where });
  }

  async findAllWithPagination(page: number, limit: number, keyword?: string) {
    const where = keyword ? [
      { name: Like(`%${keyword}%`) }
    ] : {};
    const [roles, total] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
    return { roles, total };
  }
}
