import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.interface';
import { User } from '../user/user.interface';
import * as dayjs from 'dayjs';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>
  ) {}

  async create(text: string, owner: User): Promise<Comment> {
    const createdComment = new this.commentModel();
    createdComment.text = text;
    createdComment.owner = owner;
    createdComment.createdAt = dayjs().unix();
    return await createdComment.save();
  }
}