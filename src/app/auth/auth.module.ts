import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import config from '../../config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: config.JWT_SECRET,
    signOptions: { expiresIn: '60min' }
  })],
  providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule {}