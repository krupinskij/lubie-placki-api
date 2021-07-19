import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/strategies/gql-auth.guard';
import { CurrentUser } from '../auth/strategies/current-user';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { CommentService } from './comment.service';
import { Comment } from './dto/comment.dto';

@Resolver()
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService
  ) {}

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async createComment(@Args('text') text: string, @CurrentUser() user: User) {
    const owner = await this.userService.findById(user._id);
    return await this.commentService.create(text, owner);
  }
}