import * as mongoose from 'mongoose';
import { DirectionSchema } from './direction.schema';
import { HintSchema } from './hint.schema';
import { IngredientSchema } from './ingredient.schema';

export const RecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  ingredients: [IngredientSchema],
  directions: [DirectionSchema],
  hints: [HintSchema],
  createdAt: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});