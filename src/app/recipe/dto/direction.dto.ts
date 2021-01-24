import { ObjectType, Field, Int, ID } from  "@nestjs/graphql";

@ObjectType()
export class Direction {
  @Field()
  readonly text: string;
}