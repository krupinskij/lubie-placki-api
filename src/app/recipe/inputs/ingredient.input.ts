import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class IngredientInput {
  @Field()
  readonly product: string;
  @Field(() => Float)
  readonly quantity: number;
  @Field()
  readonly unit: string;
}