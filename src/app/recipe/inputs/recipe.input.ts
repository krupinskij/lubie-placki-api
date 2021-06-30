import { Field, InputType } from "@nestjs/graphql";
import { DirectionInput } from "./direction.input";
import { HintInput } from "./hint.input";
import { IngredientInput } from "./ingredient.input";

@InputType()
export class RecipeInput {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field(type => [IngredientInput])
  readonly ingredients: IngredientInput;
  @Field(type => [DirectionInput])
  readonly directions: DirectionInput[];
  @Field(type => [HintInput])
  readonly hints: HintInput[];
}