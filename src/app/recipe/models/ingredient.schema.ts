import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  unit: String,
});