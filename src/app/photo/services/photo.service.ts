import { Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { FileUpload } from 'graphql-upload';
import { MongoGridFS } from 'mongo-gridfs';

@Injectable()
export class PhotoService {
  private fileModel: MongoGridFS;
  
  constructor(
    @InjectConnection() private readonly connection: Connection
  ) {
    this.fileModel = new MongoGridFS(this.connection.db as any, 'photo');
  }  
  
  async save(file: FileUpload) {
    const fileInfo = await this.fileModel.writeFileStream(file.createReadStream(), {
      filename: file.filename,
      contentType: file.mimetype
    });

    return fileInfo;
  }
}