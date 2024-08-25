import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Access } from "../entities/access.entity";
import { TreeRepository, Like } from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";
import { CreateAccessDto,UpdateAccessDto } from "../dto/access.dto";
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
  async create(createDto: CreateAccessDto) {
    const {parentId,...dto} = createDto;
    const access = this.repository.create(dto);
    if(parentId){
      access.parent = await this.repository.findOneBy({id:parentId})
    }
    return await this.repository.save(access);
  }
  async update(id: number, updateDto: UpdateAccessDto) {
    return this.repository.update(id, updateDto);
  }
}
