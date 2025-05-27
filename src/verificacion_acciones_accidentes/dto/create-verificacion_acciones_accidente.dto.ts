import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateVerificacionAccionesAccidenteDto {
  @IsString()
  resultado: string;

  @IsUUID()
  responsable_aplicar_correcciones: string;

  @IsDateString()
  fecha_verificacion: string;

  @IsUUID()
  accidente: string;

  @IsUUID()
  usuario_reporta: string;
}
