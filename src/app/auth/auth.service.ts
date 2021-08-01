import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginInput } from './inputs/auth-login.input';
import { AuthRegisterInput } from './inputs/auth-register.input';
import { UserToken } from './dto/user-token.dto';
import { User } from '../user/user.interface';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async validateUser(loginPass: string, userPass: string): Promise<boolean> {
        return bcrypt.compare(loginPass, userPass);
    }

    async validateRefreshToken(
        refreshToken: string, 
        userRefreshToken: string, 
        userRefreshTokenExpirationDate: number
    ): Promise<boolean> {
        return (
            dayjs.unix(userRefreshTokenExpirationDate).isBefore(new Date()) &&
            refreshToken === userRefreshToken
        );
    }

    signToken(user: User, refreshToken = ''): UserToken {
        const payload = {
            username: user.username,
            _id: user._id
        }

        return { user, token: this.jwtService.sign(payload), refreshToken };
    }

    async login(input: AuthLoginInput): Promise<UserToken> {
        const user = await this.userService.findOne(input.email);
        if(!user) {
            throw new NotFoundException(`User with email ${input.email} does not exist`)
        }

        if(!this.validateUser(input.password, user.password)) {
            throw new UnauthorizedException(`Invalid password`);
        }

        const salt = await bcrypt.genSalt(10);
        const refreshToken = await bcrypt.hash(new Date().toDateString(), salt);
        const refreshTokenExpiration = dayjs().add(7, 'day').unix();

        user.refreshToken = refreshToken;
        user.refreshTokenExpiration = refreshTokenExpiration;
        await user.save();

        return this.signToken(user, refreshToken);
    }

    async register(input: AuthRegisterInput): Promise<UserToken> {
        const existingUser = await this.userService.findOne(input.email);

        if (existingUser) {
            throw new BadRequestException(`Cannot register with email ${input.email}`)
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(input.password, salt);

        const refreshToken = await bcrypt.hash(new Date().toDateString(), salt);
        const refreshTokenExpiration = dayjs().add(7, 'day').unix();

        const user = await this.userService.createUser({
            ...input,
            password,
            refreshToken,
            refreshTokenExpiration
        });
        
        return this.signToken(user, refreshToken);
    }

    async getNewToken(refreshToken: string): Promise<UserToken> {
        const user = await this.userService.findByRefreshToken(refreshToken); 

        if(!this.validateRefreshToken(refreshToken, user.refreshToken, user.refreshTokenExpiration)) {
            throw new UnauthorizedException(`Invalid refresh token`);
        }

        return this.signToken(user);
    }
}