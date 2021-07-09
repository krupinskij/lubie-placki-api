import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';

import config from '../../../config';

@Injectable()
export class GridFsService implements MulterOptionsFactory {
  private gridFsStorage: any;
  
  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: config.DATABASE_URI,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename
          };
          resolve(fileInfo);
        });
      }
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
        storage: this.gridFsStorage,
    };
  }
}