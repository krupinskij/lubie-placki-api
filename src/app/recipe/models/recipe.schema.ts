import * as mongoose from 'mongoose';
import { DirectionSchema } from './direction.schema';
import { HintSchema } from './hint.schema';
import { IngredientSchema } from './ingredient.schema';

export const RecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: [IngredientSchema],
  directions: [DirectionSchema],
  hints: [HintSchema]
});