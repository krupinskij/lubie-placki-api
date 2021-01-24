import { ObjectType, Field, Int, ID } from  "@nestjs/graphql";

@ObjectType()
export class Hint {
  @Field()
  readonly text: string;
}