import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from 'src/shared/services/category.service';

@Controller('api/categories')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ){

    }

    @Get()
    async getCategories(@Query('selectedCategoryId') selectedCategoryId:string=''){
        const categories = await this.categoryService.findAllList();
        return {selectedCategoryId:selectedCategoryId??'',categories}
    }
}
