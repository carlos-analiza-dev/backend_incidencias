import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaiDto {
  @IsNotEmpty()
  @IsString()
  nombre_pais: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
