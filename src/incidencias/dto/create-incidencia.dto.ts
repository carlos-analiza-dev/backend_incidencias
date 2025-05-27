import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Categorias } from 'src/types/categorias.ype';

export class CreateIncidenciaDto {
  @IsString()
  @IsNotEmpty()
  area: string;

  @IsNotEmpty()
  fecha_incidente: string;

  @IsString()
  hora: string;

  @IsEnum(Categorias, {
    message: 'El campo categoria debe ser un valor válido',
  })
  @IsOptional()
  categoria?: Categorias;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  correo: string;

  @IsNotEmpty({ message: 'La sucursal es obligatoria' })
  @IsUUID('4', { message: 'El ID del sucursal debe ser un UUID válido' })
  sucursalId: string;
}
