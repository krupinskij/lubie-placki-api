import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  text: String,
  createdAt: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }
});