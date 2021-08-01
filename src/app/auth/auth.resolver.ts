import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { UserToken } from './dto/user-token.dto';
import { AuthLoginInput } from './inputs/auth-login.input';
import { AuthRegisterInput } from './inputs/auth-register.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserToken)
  refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.getNewToken(refreshToken);
  }

  @Mutation(() => UserToken)
  login(@Args({ name: 'input', type: () => AuthLoginInput }) input: AuthLoginInput) {
    return this.authService.login(input)
  }

  @Mutation(() => UserToken)
  register(@Args({ name: 'input', type: () => AuthRegisterInput }) input: AuthRegisterInput) {
    return this.authService.register(input)
  }
}