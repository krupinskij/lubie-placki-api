import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeResolver } from './recipe.resolver';
import { RecipeSchema } from './models/recipe.schema';
import { RecipeService } from './recipe.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }])],
  providers: [RecipeResolver, RecipeService],
  exports: [RecipeService]
})
export class RecipeModule {}