import { PartialType } from '@nestjs/mapped-types';
import { CreateAccidenteDto } from './create-accidente.dto';

export class UpdateAccidenteDto extends PartialType(CreateAccidenteDto) {}
