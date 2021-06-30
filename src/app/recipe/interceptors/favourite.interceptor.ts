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
      data.isFavourite = !!data.fans.find(fan => fan._id === currentUser._id);
      data.fans = null;
      return data;
    }));
  }
}