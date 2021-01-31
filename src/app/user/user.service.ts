import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { NewUserInput } from './input/new-user.input';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findOne(email: string): Promise<User> {
        return await this.userModel.findOne({email});
    }

    async createUser(newUserInput: NewUserInput): Promise<User> {
        return await this.userModel.create(newUserInput);
    }
}