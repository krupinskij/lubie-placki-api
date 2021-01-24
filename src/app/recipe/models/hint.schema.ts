import * as mongoose from 'mongoose';

export const HintSchema = new mongoose.Schema({
  text: String
});