import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description?: string;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
