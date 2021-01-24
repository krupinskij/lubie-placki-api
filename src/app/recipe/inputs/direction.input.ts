import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DirectionInput {
  @Field()
  readonly text: string;
}