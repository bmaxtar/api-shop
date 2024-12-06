import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
  ) {}

  //recuperation de tous les produits
  findAll(): Promise<Product[]> {
    return this.productModel.find().populate('category');
  }

  //create product
  async create(product: Product): Promise<Product> {
    const res = await this.productModel.create(product);
    return res;
  }

  //product by id
  async findById(id: string): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException("Cet id n'est pas valide");
    }
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  //update product
  async updateById(id: string, product: Product): Promise<Product> {
    this.findById(id);
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
  }

  //delete product
  async deleteById(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
