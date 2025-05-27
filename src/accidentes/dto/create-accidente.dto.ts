import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsDateString,
  IsNumber,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { Categorias } from 'src/types/categorias.ype';

export class CreateAccidenteDto {
  @IsString()
  @IsNotEmpty()
  area: string;

  @IsUUID()
  @IsNotEmpty()
  sucursalId: string;

  @IsString()
  @IsNotEmpty()
  nombreNotificante: string;

  @IsEnum(Categorias, {
    message: 'El campo categoria debe ser un valor válido',
  })
  @IsOptional()
  categoria?: Categorias;

  @IsString()
  @IsNotEmpty()
  cargoNotificante: string;

  @IsString()
  @IsNotEmpty()
  nombreAfectado: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  dniAfectado: string;

  @IsDateString()
  @IsNotEmpty()
  fechaIncidente: Date;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  hora: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsOptional()
  @IsNumber()
  enPuesto?: number;

  @IsOptional()
  @IsNumber()
  laboresHabituales?: number;

  @IsOptional()
  @IsNumber()
  detallaParteCuerpo?: number;

  @IsOptional()
  @IsNumber()
  usoEPPCompleto?: number;

  @IsOptional()
  @IsString()
  descripcionEPP?: string;

  @IsOptional()
  @IsNumber()
  exigeAtencionJefeLab?: number;

  @IsOptional()
  @IsString()
  accionTomada?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsString()
  correo?: string;
}
