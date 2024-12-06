import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  async createProduct(
    @Body()
    product: Product,
  ): Promise<Product> {
    return this.productsService.create(product);
  }

  @Get(':id')
  async getProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productsService.findById(id);
  }
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productsService.updateById(id, product);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id')
    id: string,
  ): Promise<{ deleted: Boolean }> {
    await this.productsService.findById(id);
    const product = this.productsService.deleteById(id);
    if (product) {
      return {
        deleted: true,
      };
    }
  }
}
