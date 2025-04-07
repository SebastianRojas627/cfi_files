import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Archivo } from './entities/files.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,
    private readonly configService: ConfigService
  ) {}

  private handleUpload(file: Express.Multer.File) {
    const serverUrl = this.configService.get<string>('SERVER_URL');
    const uploadPath = this.configService.get<string>('UPLOAD_PATH');
    const relativePath = file.path.replace(uploadPath || '', '').replace(/\\/g, '/');

    return {
      message: 'Archivo cargado exitosamente',
      filename: file.filename,
      url: `${serverUrl}/uploads${relativePath}`
    }
  }

  async createFile(file: Express.Multer.File, createArchivoDto: CreateArchivoDto) {
    const archivoUploaded = await this.handleUpload(file);
    const { solicitud_id, tipo } = createArchivoDto;

    const newArchivoDto = {
      solicitud_id,
      tipo,
      file_url: archivoUploaded.url,
      fecha_solicitud: new Date()
    }

    const archivoGuardado = this.archivoRepository.create(newArchivoDto);
    return await this.archivoRepository.save(archivoGuardado);
  }
}
