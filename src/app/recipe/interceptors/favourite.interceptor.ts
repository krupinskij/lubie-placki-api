import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.interface';

export interface Response {
  recipe: Recipe;
}

@Injectable()
export class FavouriteInterceptor implements NestInterceptor<Recipe, Recipe> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Recipe> {
    return next.handle().pipe(map((recipe: Recipe) => {
      const ctx = GqlExecutionContext.create(context);
      const currentUser = ctx.getContext().req.user;

      recipe.isFavourite = !!recipe.fans.find(fan => String(fan) === String(currentUser?._id));

      return recipe;
    }));
  }
}