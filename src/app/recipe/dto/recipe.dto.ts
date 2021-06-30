import { ObjectType, Field, Int, ID } from  "@nestjs/graphql";
import { User } from "src/app/user/dto/user.dto";
import { Direction } from "./direction.dto";
import { Hint } from "./hint.dto";
import { Ingredient } from "./ingredient.dto";

@ObjectType()
export class Recipe {
  @Field(() => ID)
  _id: string;
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
  @Field(() => User)
  readonly owner: User;
  @Field()
  readonly createdAt: number;
  @Field()
  readonly isFavourite: boolean;
}