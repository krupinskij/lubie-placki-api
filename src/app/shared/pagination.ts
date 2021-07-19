import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { Recipe } from '../recipe/dto/recipe.dto';
import { Recipe as RecipeModel } from '../recipe/recipe.interface';
import { Comment } from '../comment/dto/comment.dto';
import { Comment as CommentModel } from '../comment/comment.interface';

function Paginated<T>(classRef: Type<T>): any {
  @ObjectType()
  abstract class PaginatedType {
    @Field(() => Int)
    pages: number;

    @Field(() => [classRef])
    data: T[];

    constructor(data: T[], count: number, limit: number) {
      this.data = data,
      this.pages = Math.ceil(count / limit);
    }
  }
  return PaginatedType;
}

@ObjectType()
export class RecipePaginated extends Paginated(Recipe) {
  constructor(data: RecipeModel[], count: number, limit: number) {
    super(data, count, limit);
  }
}

@ObjectType()
export class CommentPaginated extends Paginated(Comment) {
  constructor(data: CommentModel[], count: number, limit: number) {
    super(data, count, limit);
  }
}
