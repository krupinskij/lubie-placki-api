import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipePaginated } from 'src/app/shared/pagination';
import { Recipe } from '../recipe.interface';

export interface Response {
  recipes: RecipePaginated;
}

@Injectable()
export class FavouritesInterceptor implements NestInterceptor<RecipePaginated, RecipePaginated> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<RecipePaginated> {
    return next.handle().pipe(map((recipes: RecipePaginated) => {
      const ctx = GqlExecutionContext.create(context);
      const currentUser = ctx.getContext().req.user;

      recipes.data.forEach((recipe: Recipe) => { 
        recipe.isFavourite = !!recipe.fans.find(fan => fan == currentUser?._id); 
      })

      return recipes;
    }));
  }
}