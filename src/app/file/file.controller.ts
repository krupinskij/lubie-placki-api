import { Controller, Get, Param, StreamableFile } from "@nestjs/common";
import { FileService } from "./file.service";

@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService
  ) { }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const fileStream = await this.fileService.getFile(id);
    return new StreamableFile(fileStream); 
  }
}