import { ObjectType, Field, Int, ID } from  "@nestjs/graphql";

@ObjectType()
export class Photo {
  @Field(() => ID)
  _id: string;
}