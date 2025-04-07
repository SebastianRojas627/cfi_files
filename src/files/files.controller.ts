import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateArchivoDto } from './dto/create-archivo.dto';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a PDF file' })
  @ApiBody({
    description: 'Creacion y almacenamiento de archivos',
    type: CreateArchivoDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = process.env.UPLOAD_PATH || '/uploads';
          cb(null, uploadPath)
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`;
          cb(null, filename)
        }
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
          return cb(new Error('Solo se permiten archivos en formato PDF'), false);
        }
        cb(null, true)
      }
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createArchivoDto: CreateArchivoDto) {
    return await this.filesService.createFile(file, createArchivoDto)
  }
}