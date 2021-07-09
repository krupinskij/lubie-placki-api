import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PhotoInput {
  @Field()
  readonly photoId: string;
  @Field()
  readonly recipeId: string;
}