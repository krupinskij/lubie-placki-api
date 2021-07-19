import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from '../auth/strategies/current-user';
import { GqlAuthGuard } from '../auth/strategies/gql-auth.guard';
import { UserService } from '../user/user.service';
import { User } from './dto/user.dto';
import { AvatarInput } from './input/avatar.input';
import { EditUserInput } from './input/edit-user.input';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) {}
    
  @Query(() => User)
  async user(@Args('id') id: string) {
    return await this.userService.findById(id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async editUser(@Args('editUserInput') editUserInput: EditUserInput, @CurrentUser() user: User) {
    return await this.userService.editUser(editUserInput, user._id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async addAvatarToUser(@Args('avatarInput') { avatarId }: AvatarInput, @CurrentUser() user: User) {
    return await this.userService.addAvatarToUser(avatarId, user._id);
  }
}