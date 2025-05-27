import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateVerificacionAccioneDto {
  @IsString()
  resultado: string;

  @IsUUID()
  responsable_aplicar_correcciones: string;

  @IsDateString()
  fecha_verificacion: string;

  @IsUUID()
  incidente: string;

  @IsUUID()
  usuario_reporta: string;
}
