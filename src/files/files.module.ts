import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Archivo])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
