import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/strategies/gql-auth.guard';
import { CurrentUser } from '../auth/strategies/current-user';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { CommentService } from './comment.service';
import { Comment } from './dto/comment.dto';
import { PaginationInput } from '../shared/input/pagination.input';
import { CommentPaginated } from '../shared/pagination';
import { RecipeService } from '../recipe/recipe.service';
import { CommentInput } from './inputs/comment';

@Resolver()
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly recipeService: RecipeService
  ) {}

  @Query(() => CommentPaginated)
  async commentsByRecipeId(@Args('recipeId') recipeId: string, @Args('pageInput') options: PaginationInput) {
    const recipe = await this.recipeService.findOne(recipeId);
    return await this.commentService.findAllByRecipeId(recipe, options);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async createComment(@Args('commentInput') { text, recipeId }: CommentInput, @CurrentUser() user: User) {
    const recipe = await this.recipeService.findOne(recipeId);
    const owner = await this.userService.findById(user._id);
    return await this.commentService.create(text, recipe, owner);
  }
}