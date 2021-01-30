import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/app/user/dto/user.dto'

@ObjectType()
export class UserToken {
  @Field()
  token: string

  @Field()
  user: User
}