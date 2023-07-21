import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer, fileFilter } from './helpers/index';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
    ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,//configurar la respuesta de Nest
    @Param('imageName') imageName:string){
      const dirpath = this.filesService.getStaticProductImage( imageName );
      res.sendFile( dirpath );
      /*res.status(403).json({
        ok: false,
        path: dirpath
      })*/
  }

  @Post('product')
  @UseInterceptors( FileInterceptor('file',{
    fileFilter: fileFilter,
    //limits:{}
    storage: diskStorage({// donde se almacenaran las imagenes
      destination:'./static/uploads',
      filename: fileNamer
    })
  }))
  uploadProductImage( @UploadedFile() file: Express.Multer.File,){
    //console.log({ fileInController: file})  

    if( !file ){
      throw new BadRequestException('Make sure that the file is an image');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/api/files/static/uploads/${file.filename}`

    return {
        secureUrl
      }
  }

}
