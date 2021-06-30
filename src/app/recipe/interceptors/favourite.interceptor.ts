import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class FavouriteInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => {
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