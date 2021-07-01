import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { PhotoSchema } from './models/photo.schema';
import { PhotoResolver } from './photo.resolver';
import { PhotoService } from './photo.service';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: 'Recipe', schema: PhotoSchema }])],
  providers: [PhotoResolver, PhotoService],
})
export class PhotoModule {}