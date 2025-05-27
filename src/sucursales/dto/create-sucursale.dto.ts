import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSucursaleDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @IsNotEmpty({ message: 'El del país es obligatorio' })
  @IsUUID('4', { message: 'El ID del país debe ser un UUID válido' })
  paisId: string;

  @IsUUID()
  @IsNotEmpty()
  areaId: string;
}
