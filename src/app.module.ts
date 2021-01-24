import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipeModule } from './app/recipe/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';

import config from './config';

@Module({
  imports: [
    RecipeModule,
    GraphQLModule.forRoot({
      cors: {
        origin: true
      },
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(config.DATABASE_URI),
  ],
  providers: [],
})
export class AppModule {}