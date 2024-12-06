import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  async createCategory(
    @Body()
    category: Category,
  ): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Get(':id')
  async getCategory(
    @Param('id')
    id: string,
  ): Promise<Category> {
    return this.categoryService.findById(id);
  }
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoryService.updateById(id, category);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id')
    id: string,
  ): Promise<{ deleted: Boolean }> {
    await this.categoryService.findById(id);
    const category = this.categoryService.deleteById(id);
    if (category) {
      return {
        deleted: true,
      };
    }
  }
}
