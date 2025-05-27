import { PartialType } from '@nestjs/mapped-types';
import { CreateImplementacionAccioneDto } from './create-implementacion_accione.dto';

export class UpdateImplementacionAccioneDto extends PartialType(CreateImplementacionAccioneDto) {}
