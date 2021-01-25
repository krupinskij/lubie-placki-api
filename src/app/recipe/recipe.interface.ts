import { Document } from 'mongoose';
import { Direction, Hint, Ingredient } from '../../typings/types';

export interface Recipe extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly ingredients: Ingredient[];
  readonly direction: Direction[];
  readonly hints: Hint[];
}