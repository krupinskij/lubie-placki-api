import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  username: string;
  readonly password: string;
  refreshToken: string;
  refreshTokenExpiration: number;
  bio: string;
  avatar: string;
}