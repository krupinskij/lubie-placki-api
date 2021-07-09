import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Photo } from './dto/photo.dto';
import { PhotoService } from './services/photo.service';

@Resolver()
export class PhotoResolver {
  constructor(
    private readonly photoService: PhotoService
  ) {}

  @Mutation(() => Photo)
  async uploadPhoto(@Args({name: 'file', type: () => GraphQLUpload}) file: FileUpload) {
    return await this.photoService.save(file);
  }
}