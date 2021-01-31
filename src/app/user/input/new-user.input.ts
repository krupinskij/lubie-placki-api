import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewUserInput {
  @Field()
  email: string

  @Field({ nullable: true })
  username?: string

  @Field()
  password: string
}