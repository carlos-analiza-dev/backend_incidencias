import { PartialType } from '@nestjs/mapped-types';
import { CreateImplementacionAccionesAccidenteDto } from './create-implementacion_acciones_accidente.dto';

export class UpdateImplementacionAccionesAccidenteDto extends PartialType(CreateImplementacionAccionesAccidenteDto) {}
