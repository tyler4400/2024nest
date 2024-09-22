import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from 'src/shared/services/tag.service';

@Controller('api/tags')
export class TagController {
    constructor(
        private readonly tagService:TagService
    ){}

    @Get()
    async getTags(@Query('selectedTagId') selectedTagId:string=''){
        const tags = await this.tagService.findAll();
        return {tags,selectedTagId:selectedTagId??""}
    }
}
