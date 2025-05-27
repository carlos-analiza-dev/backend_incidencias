import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateImplementacionAccioneDto {
  @IsNotEmpty({ message: 'Las acciones tomadas son obligatorias' })
  @IsString()
  acciones_tomadas: string;

  @IsUUID()
  @IsNotEmpty({ message: 'El responsable es obligatorio' })
  responsable_aplicar_correcciones_id: string;

  @IsDateString({}, { message: 'La fecha límite debe tener formato de fecha' })
  fecha_limite_implementacion: Date;

  @IsUUID()
  @IsNotEmpty({ message: 'El incidente es obligatorio' })
  incidente_accion_id: string;

  @IsUUID()
  @IsNotEmpty({ message: 'El usuario que reporta es obligatorio' })
  usuario_accion_id: string;
}
