import { Document } from 'mongoose';

export interface Photo extends Document {
  readonly _id: string;
}