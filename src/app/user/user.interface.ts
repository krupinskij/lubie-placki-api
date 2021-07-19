import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  username: string;
  readonly password: string;
  bio: string;
  avatar: string;
}