import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PhotoResolver } from './photo.resolver';
import { GridFsService } from './services/gridFS.service';
import { PhotoService } from './services/photo.service';

@Module({
  imports: [
    MulterModule.registerAsync({
        useClass: GridFsService,
    }),
  ],
  providers: [GridFsService, PhotoResolver, PhotoService],
})
export class PhotoModule {}