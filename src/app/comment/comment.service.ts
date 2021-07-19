import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.interface';
import { User } from '../user/user.interface';
import * as dayjs from 'dayjs';
import { PaginationInput } from '../shared/input/pagination.input';
import { CommentPaginated } from '../shared/pagination';
import { Recipe } from '../recipe/recipe.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>
  ) {}

  async findAllByRecipeId(recipe: Recipe, { page, limit }: PaginationInput): Promise<CommentPaginated> {
    const query = this.commentModel.find({ recipe }).populate('owner');

    const data = await query.skip(Math.ceil(limit * (page - 1))).limit(limit);
    const count = await query.countDocuments();

    return new CommentPaginated(data, count, limit);
  }

  async create(text: string, recipe: Recipe, owner: User): Promise<Comment> {
    const createdComment = new this.commentModel();
    createdComment.text = text;
    createdComment.owner = owner;
    createdComment.recipe = recipe;
    createdComment.createdAt = dayjs().unix();
    return await createdComment.save();
  }
}