import { ObjectType, Field, Int, ID } from  "@nestjs/graphql";
import { User } from "src/app/user/dto/user.dto";

@ObjectType()
export class Comment {
  @Field(() => ID)
  _id: string;
  @Field()
  readonly text: string;
  @Field(() => User)
  readonly owner: User;
  @Field()
  readonly createdAt: number;
}