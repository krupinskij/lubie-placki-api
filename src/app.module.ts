import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipeModule } from './app/recipe/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';

import config from './config';

@Module({
  imports: [
    RecipeModule,
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
      }
    }),
    MongooseModule.forRoot(config.DATABASE_URI),
  ],
  providers: [],
})
export class AppModule {}