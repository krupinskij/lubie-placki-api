import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { NewUserInput } from './input/new-user.input';
import { EditUserInput } from './input/edit-user.input';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findOne(email: string): Promise<User> {
        return await this.userModel.findOne({email});
    }

    async findById(_id: string): Promise<User> {
        return await this.userModel.findOne({ _id });
    }

    async findByRefreshToken(refreshToken: string): Promise<User> {
        return await this.userModel.findOne({ refreshToken });
    }

    async createUser(newUserInput: NewUserInput): Promise<User> {
        return await this.userModel.create({
            ...newUserInput,
            bio: ''
        });
    }

    async editUser(editUserInput: EditUserInput, currUserId: string): Promise<User> {
        const user = await this.userModel.findById(currUserId);
        user.username = editUserInput.username;
        user.bio = editUserInput.bio;

        return await user.save();
    }

    async addAvatarToUser(avatarId: string, userId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        user.avatar = avatarId;
        return await user.save();
      }
}