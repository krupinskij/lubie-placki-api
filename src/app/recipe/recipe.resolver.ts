import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { Recipe } from './dto/recipe.dto';
import { RecipeInput } from './inputs/recipe.input';
import { Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/strategies/gql-auth.guard';
import { CurrentUser } from '../auth/strategies/current-user';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { FavouriteInterceptor } from './interceptors/favourite.interceptor';
import { OptAuthGuard } from '../auth/strategies/opt-auth.guard';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { PhotoInput } from './inputs/photo.input';
import { PaginationPipe } from '../shared/pipes/pagination.pipe';
import { PaginationOptions } from '../shared/pagination-options';
import { PaginationInput } from '../shared/input/pagination.input';
import { RecipePaginated } from '../shared/pagination';

@Resolver()
export class RecipeResolver {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly userService: UserService
  ) {}
    
  // @Query(() => RecipePagination)
  // @UseGuards(OptAuthGuard)
  // // @UseInterceptors(FavouriteInterceptor)
  // async recipe(@Args('id') id: string) {
  //   return await this.recipeService.findOne(id);
  // }
  
  @Query(() => RecipePaginated)
  @UseGuards(OptAuthGuard)
  // @UseInterceptors(FavouriteInterceptor)
  async recipes(@Args('pageInput') options: PaginationInput) {
    return await this.recipeService.findAll(options);
  }

  @Query(() => [Recipe])
  @UseGuards(OptAuthGuard)
  @UseInterceptors(FavouriteInterceptor)
  async randomRecipe() {
    return await this.recipeService.findRandom();
  }

  @Query(() => [Recipe])
  @UseGuards(OptAuthGuard)
  @UseInterceptors(FavouriteInterceptor)
  async typeRecipes(@Args('type') type: string) {
    return await this.recipeService.findAllByType(type);
  }

  @Query(() => [Recipe])
  @UseGuards(GqlAuthGuard)
  @UseInterceptors(FavouriteInterceptor)
  async favouriteRecipes(@CurrentUser() user: User) {
    const currentUser = await this.userService.findById(user._id);
    return await this.recipeService.findAllFavourite(currentUser);
  }

  @Mutation(() => Recipe)
  @UseGuards(GqlAuthGuard)
  async createRecipe(@Args('input') input: RecipeInput, @CurrentUser() user: User) {
    const owner = await this.userService.findById(user._id);
    return await this.recipeService.create(input, owner);
  }

  @Mutation(() => Recipe)
  @UseGuards(GqlAuthGuard)
  async addToFavourite(@Args('id') recipeId: string, @CurrentUser() user: User) {
    const currentUser = await this.userService.findById(user._id);
    return await this.recipeService.addToFavourite(recipeId, currentUser);
  }

  @Mutation(() => Recipe)
  @UseGuards(GqlAuthGuard)
  async removeFromFavourite(@Args('id') recipeId: string, @CurrentUser() user: User) {
    const currentUser = await this.userService.findById(user._id);
    return await this.recipeService.removeFromFavourite(recipeId, currentUser);
  }

  @Mutation(() => Recipe)
  @UseGuards(GqlAuthGuard)
  async addPhotoToRecipe(@Args('input') { recipeId, photoId }: PhotoInput) {
    return await this.recipeService.addPhotoToRecipe(recipeId, photoId);
  }
}