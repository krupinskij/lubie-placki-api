import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { User } from './dto/user.dto';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) {}
    
  @Query(() => User)
  async user(@Args('id') id: string) {
    return await this.userService.findById(id);
  }
}