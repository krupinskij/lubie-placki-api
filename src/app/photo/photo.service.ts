import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photo } from './photo.interface';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel('Photo') private readonly photoModel: Model<Photo>
  ) {}
}