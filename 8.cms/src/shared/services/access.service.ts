import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Access } from "../entities/access.entity";
import { TreeRepository, Like } from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";

@Injectable()
export class AccessService extends MySQLBaseService<Access> {
  constructor(
    @InjectRepository(Access) protected repository: TreeRepository<Access>
  ) {
    super(repository);
  }

  async findAll() {
    const accessTree = await this.repository.findTrees({relations:['parent','children']});
    return accessTree.filter(access=>!access.parent);//只返回根节点
  }

  async findAllWithPagination(page: number, limit: number, keyword?: string) {
    const where = keyword ? [
      { name: Like(`%${keyword}%`) }
    ] : {};
    const [accesses, total] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
    return { accesses, total };
  }
}
