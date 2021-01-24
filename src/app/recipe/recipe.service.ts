import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.interface';
import { RecipeInput } from './inputs/recipe.input';

@Injectable()
export class RecipeService {
  constructor(@InjectModel('Recipe') private readonly recipeModel: Model<Recipe>) {}

  async findOne(_id: string): Promise<Recipe> {
    return await this.recipeModel.findOne({ _id })
  }

  async findAll(): Promise<Recipe[]> {
    return await this.recipeModel.find().exec();
  }

  async create(recipeInput: RecipeInput): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(recipeInput);
    return await createdRecipe.save();
  }
}