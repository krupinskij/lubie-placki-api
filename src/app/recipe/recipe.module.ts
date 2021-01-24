import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeResolver } from './recipe.resolver';
import { RecipeSchema } from './models/recipe.schema';
import { RecipeService } from './recipe.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }])],
  providers: [RecipeResolver, RecipeService],
})
export class RecipeModule {}