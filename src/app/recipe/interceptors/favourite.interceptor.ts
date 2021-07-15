import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.interface';

export interface Response {
  data: Recipe | Recipe[];
}

@Injectable()
export class FavouriteInterceptor implements NestInterceptor<Recipe | Recipe[], Recipe | Recipe[]> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Recipe | Recipe[]> {
    return next.handle().pipe(map((data: Recipe | Recipe[]) => {
      const ctx = GqlExecutionContext.create(context);
      const currentUser = ctx.getContext().req.user;

      if(Array.isArray(data)) {
        data.forEach(d => { d.isFavourite = !!d.fans.find(fan => fan == currentUser?._id); })
      } else {
        data.isFavourite = !!data.fans.find(fan => String(fan) === String(currentUser?._id));
      }

      return data;
    }));
  }
}