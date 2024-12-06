import { Category } from './schemas/category.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: mongoose.Model<Category>,
  ) {}

  //recuperation de tous les produits
  findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  //create product
  async create(category: Category): Promise<Category> {
    const res = await this.categoryModel.create(category);
    return res;
  }

  //product by id
  async findById(id: string): Promise<Category> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException("Cet id n'est pas valide");
    }
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('product not found');
    }
    return category;
  }

  //update product
  async updateById(id: string, category: Category): Promise<Category> {
    this.findById(id);
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
  }

  //delete product
  async deleteById(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
