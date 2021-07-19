import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from '../recipe/recipe.module';
import { UserModule } from '../user/user.module';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CommentSchema } from './models/comment.schema';

@Module({
  imports: [UserModule, RecipeModule, MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}