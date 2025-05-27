import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsUUID()
  paisId: string;

  @IsUUID()
  gerenteId: string;
}
