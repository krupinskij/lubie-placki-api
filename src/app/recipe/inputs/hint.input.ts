import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class HintInput {
  @Field()
  readonly text: string;
}