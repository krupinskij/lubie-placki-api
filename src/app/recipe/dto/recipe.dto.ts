import { ObjectType, Field, Int, ID } from  "@nestjs/graphql";
import { Direction } from "./direction.dto";
import { Hint } from "./hint.dto";
import { Ingredient } from "./ingredient.dto";

@ObjectType()
export class Recipe {
  @Field(() => ID)
  id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field(() => [Ingredient])
  readonly ingredients: Ingredient[];
  @Field(() => [Direction])
  readonly directions: Direction[];
  @Field(() => [Hint])
  readonly hints: Hint[];
}