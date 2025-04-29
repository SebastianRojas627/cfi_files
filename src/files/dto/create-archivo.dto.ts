import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsDateString,
  Length,
  IsUUID,
} from 'class-validator';

export class CreateArchivoDto {
  @ApiProperty({
    example: '9a33c5d2-5d15-4b82-a0d5-123456789abc',
    description: 'UUID de la solicitud relacionada',
    type: 'string',
    format: 'uuid',
  })
  @IsUUID()
  solicitud_id: string;

  @ApiPropertyOptional({
    example: 'PDF',
    description: 'Tipo de archivo (opcional)',
    maxLength: 15,
  })
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
