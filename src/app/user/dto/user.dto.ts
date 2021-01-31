import { ObjectType, Field, ID } from  "@nestjs/graphql";

@ObjectType()
export class User {
  @Field({ nullable: true })
  id?: number

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  username?: string

  password?: string
}