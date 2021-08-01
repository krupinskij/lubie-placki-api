import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  refreshToken: String,
  refreshTokenExpiration: Number,
  bio: String,
  avatar: String
});