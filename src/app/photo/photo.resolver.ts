import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { PhotoService } from './photo.service';

@Resolver()
export class PhotoResolver {
  constructor(
    private readonly photoService: PhotoService
  ) {}

  @Mutation(() => Boolean)
  async uploadPhoto(@Args({name: 'file', type: () => GraphQLUpload}) file: FileUpload) {
    console.log(file);
    return true;
  }
}