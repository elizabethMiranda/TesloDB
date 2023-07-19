import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/file.Filter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors( FileInterceptor('file',{
    fileFilter: fileFilter
  }))
  uploadProductImage( @UploadedFile() file: Express.Multer.File,){
    //console.log({ fileInController: file})  

    if( !file ){
      throw new BadRequestException('Make sure that the file is an image');
    }

    return {
        fileName: file.originalname
      }
  }

}
