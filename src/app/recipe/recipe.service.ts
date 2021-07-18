import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.interface';
import { RecipeInput } from './inputs/recipe.input';
import { User } from '../user/user.interface';
import * as dayjs from 'dayjs';
import { PaginationInput } from '../shared/input/pagination.input';
import { RecipePaginated } from '../shared/pagination';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>
  ) {}

  async findOne(_id: string): Promise<Recipe> {
    return await this.recipeModel.findOne({ _id }).populate('owner');
  }

  async findAll({ page, limit }: PaginationInput): Promise<RecipePaginated> {
    const data = await this.recipeModel.find().skip(Math.ceil(limit * (page - 1))).limit(limit).populate('owner').exec();
    const count = await this.recipeModel.countDocuments();

    return new RecipePaginated(data, count, limit);
  }

  async findAllFavourite(user: User, { page, limit }: PaginationInput): Promise<RecipePaginated> {
    const query = this.recipeModel.find({ fans: { $in: [user]}});

    const data = await query.skip(Math.ceil(limit * (page - 1))).limit(limit).populate('owner').exec();
    const count = await query.countDocuments();

    return new RecipePaginated(data, count, limit);
  }

  async findRandom(): Promise<Recipe[]> {
    return await this.recipeModel.aggregate<Recipe>([{ $sample: { size: 1 } }]);
  }

  async findAllByType(type: string, { page, limit }: PaginationInput): Promise<RecipePaginated> {
    const query = this.recipeModel.find({ type });

    const data = await query.skip(Math.ceil(limit * (page - 1))).limit(limit).populate('owner').exec();
    const count = await query.countDocuments();

    return new RecipePaginated(data, count, limit);
  }

  async create(recipeInput: RecipeInput, owner: User): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(recipeInput);
    createdRecipe.owner = owner;
    createdRecipe.createdAt = dayjs().unix();
    createdRecipe.fans = [];
    return await createdRecipe.save();
  }

  async addToFavourite(recipeId: string, user: User): Promise<Recipe> {
    const recipe = await this.recipeModel.findOne({ _id: recipeId }).populate('owner');
    recipe.fans = [...recipe.fans, user];
    return await recipe.save();
  }

  async removeFromFavourite(recipeId: string, user: User): Promise<Recipe> {
    const recipe = await this.recipeModel.findOne({ _id: recipeId }).populate('owner');
    recipe.fans = recipe.fans.filter(fan => fan.id === user.id);
    return await recipe.save();
  }

  async addPhotoToRecipe(recipeId: string, photoId: string): Promise<Recipe> {
    const recipe = await this.recipeModel.findOne({ _id: recipeId }).populate('owner');
    recipe.photo = photoId;
    return await recipe.save();
  }
}