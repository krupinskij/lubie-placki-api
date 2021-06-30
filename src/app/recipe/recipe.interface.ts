import { Document } from 'mongoose';
import { Direction, Hint, Ingredient } from '../../typings/types';
import { User } from '../user/user.interface';

export interface Recipe extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly ingredients: Ingredient[];
  readonly direction: Direction[];
  readonly hints: Hint[];
  createdAt: number;
  owner: User;
  fans: User[];
}