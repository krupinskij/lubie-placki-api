import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { Recipe } from './dto/recipe.dto';
import { RecipeInput } from './inputs/recipe.input';

@Resolver()
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query(() => Recipe)
  async recipe(@Args('id') id: string) {
    return await this.recipeService.findOne(id);
  }
  
  @Query(() => [Recipe])
  async recipes() {
    return await this.recipeService.findAll();
  }

  @Mutation(() => Recipe)
  async createRecipe(@Args('input') input: RecipeInput) {
    return await this.recipeService.create(input);
  }
}