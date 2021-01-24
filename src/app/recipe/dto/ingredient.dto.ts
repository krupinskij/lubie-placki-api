import { ObjectType, Field, Int, ID, Float } from  "@nestjs/graphql";

@ObjectType()
export class Ingredient {
  @Field()
  readonly product: string;
  @Field(() => Float)
  readonly quantity: number;
  @Field()
  readonly unit: string;
}