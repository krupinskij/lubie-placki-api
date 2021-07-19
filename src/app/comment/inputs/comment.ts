import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CommentInput {
  @Field()
  readonly text: string;
  @Field()
  readonly recipeId: string;
}