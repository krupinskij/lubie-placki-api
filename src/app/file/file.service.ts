import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { MongoGridFS } from "mongo-gridfs";
import { Connection } from "mongoose";

@Injectable()
export class FileService {
  private fileModel: MongoGridFS;
  
  constructor(
    @InjectConnection() private readonly connection: Connection
  ) {
    this.fileModel = new MongoGridFS(this.connection.db as any, 'photo');
  } 

  getFile(id: string): Promise<Buffer> {
    return new Promise(async(resolve) => {
      const fileStream = await this.fileModel.readFileStream(id);
      const chunks = [];
      fileStream.on('data', (chunk) => {
        chunks.push(chunk);
      })
      fileStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      })

    })
  }
}