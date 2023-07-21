import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
    getStaticProductImage( imageName:string ){
      //solo se verifica que el archivo exista en la carpeta
      const path = join( __dirname, '../../static/uploads', imageName);
      if(existsSync(path))
          return path;
      
          throw new BadRequestException(`No product found with image ${ imageName }`);
      //verificar si existe la imagen
      //funcion join para obtener la ruta del archivo
    }
}
