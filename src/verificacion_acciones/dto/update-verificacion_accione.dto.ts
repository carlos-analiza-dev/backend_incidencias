import { PartialType } from '@nestjs/mapped-types';
import { CreateVerificacionAccioneDto } from './create-verificacion_accione.dto';

export class UpdateVerificacionAccioneDto extends PartialType(CreateVerificacionAccioneDto) {}
