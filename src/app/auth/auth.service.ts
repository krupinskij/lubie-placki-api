import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginInput } from './inputs/auth-login.input';
import { AuthRegisterInput } from './inputs/auth-register.input';
import { UserToken } from './dto/user-token.dto';
import { User } from '../user/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async validateUser(loginPass: string, userPass: string): Promise<boolean> {
        return bcrypt.compare(loginPass, userPass);
    }

    signToken(user: User): UserToken {
        const payload = {
            username: user.username,
            id: user.id
        }

        return { user, token: this.jwtService.sign(payload) };
    }

    async login(input: AuthLoginInput): Promise<UserToken> {
        const user = await this.userService.findOne(input.email);
        if(!user) {
            throw new NotFoundException(`User with email ${input.email} does not exist`)
        }

        if(!this.validateUser(input.password, user.password)) {
            throw new UnauthorizedException(`Invalid password`);
        }

        return this.signToken(user);
    }

    async register(input: AuthRegisterInput): Promise<UserToken> {
        const existingUser = await this.userService.findOne(input.email);

        if (existingUser) {
            throw new BadRequestException(`Cannot register with email ${input.email}`)
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(input.password, salt);

        const user = await this.userService.createUser({
            ...input,
            password,
        });
        
        return this.signToken(user);
    }
}