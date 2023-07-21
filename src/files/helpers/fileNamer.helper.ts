
//Importar el paquete uuid para asgnar el nombre unico a la imagen
import { v4 as uuid } from 'uuid'
//Validacion de archivos
//la funcion debe tener una estructura oara qye sea valida por fileInterceptor
export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) =>{
    
    if( !file ) return callback(new Error('File is empty'), false);

    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${uuid()}.${fileExtension}`;
    callback(null, fileName);

    
}