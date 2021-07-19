import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipeModule } from './app/recipe/recipe.module';
import { AuthModule } from './app/auth/auth.module';
import { PhotoModule } from './app/photo/photo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './app/file/file.module';

import config from './config';
import { CommentModule } from './app/comment/comment.module';

@Module({
  imports: [
    RecipeModule,
    AuthModule,
    PhotoModule,
    CommentModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      installSubscriptionHandlers: true,
      context: ({req}) => {
          return {req};
      },
      cors: {
          credentials: true,
          origin: true,
      },
      fieldResolverEnhancers: ['guards', 'interceptors']
    }),
    MongooseModule.forRoot(config.DATABASE_URI, {
      useUnifiedTopology: true
    }),
    FileModule
  ],
  providers: [],
})
export class AppModule {}