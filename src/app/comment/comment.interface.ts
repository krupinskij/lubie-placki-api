import { Document } from 'mongoose';
import { User } from '../user/user.interface';

export interface Comment extends Document {
  readonly _id: string;
  text: string;
  createdAt: number;
  owner: User;
}