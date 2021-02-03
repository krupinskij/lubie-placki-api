import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { Recipe } from './dto/recipe.dto';
import { RecipeInput } from './inputs/recipe.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/strategies/gql-auth.guard';
import { CurrentUser } from '../auth/strategies/current-user';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';

@Resolver()
export class RecipeResolver {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly userService: UserService
  ) {}

  @Query(() => Recipe)
  async recipe(@Args('id') id: string) {
    return await this.recipeService.findOne(id);
  }
  
  @Query(() => [Recipe])
  async recipes() {
    return await this.recipeService.findAll();
  }

  @Query(() => [Recipe])
  async randomRecipe() {
    return await this.recipeService.findRandom();
  }

  @Mutation(() => Recipe)
  @UseGuards(GqlAuthGuard)
  async createRecipe(@Args('input') input: RecipeInput, @CurrentUser() user: User) {
    const owner = await this.userService.findById(user._id);
    return await this.recipeService.create(input, owner);
  }
}