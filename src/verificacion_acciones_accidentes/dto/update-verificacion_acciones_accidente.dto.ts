import { PartialType } from '@nestjs/mapped-types';
import { CreateVerificacionAccionesAccidenteDto } from './create-verificacion_acciones_accidente.dto';

export class UpdateVerificacionAccionesAccidenteDto extends PartialType(CreateVerificacionAccionesAccidenteDto) {}
