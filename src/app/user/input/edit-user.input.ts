import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class EditUserInput {
  @Field()
  username: string

  @Field({ nullable: true })
  bio: string
}