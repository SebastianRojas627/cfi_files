import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, IsDateString, Length } from 'class-validator';

export class CreateArchivoDto {
  @ApiProperty({ example: 123, description: 'ID de la solicitud relacionada' })
  @IsInt()
  @Transform(({ value }) => Number(value))
  solicitud_id: number;

  @ApiPropertyOptional({ example: 'PDF', description: 'Tipo de archivo (opcional)', maxLength: 15 })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  @Length(0, 15)
  tipo?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
