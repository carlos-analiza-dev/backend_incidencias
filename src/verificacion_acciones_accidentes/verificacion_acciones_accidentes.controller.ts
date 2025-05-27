import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VerificacionAccionesAccidentesService } from './verificacion_acciones_accidentes.service';
import { CreateVerificacionAccionesAccidenteDto } from './dto/create-verificacion_acciones_accidente.dto';
import { UpdateVerificacionAccionesAccidenteDto } from './dto/update-verificacion_acciones_accidente.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Controller('verificacion-acciones-accidentes')
export class VerificacionAccionesAccidentesController {
  constructor(
    private readonly verificacionAccionesAccidentesService: VerificacionAccionesAccidentesService,
  ) {}

  @Post()
  create(
    @Body()
    createVerificacionAccionesAccidenteDto: CreateVerificacionAccionesAccidenteDto,
  ) {
    return this.verificacionAccionesAccidentesService.create(
      createVerificacionAccionesAccidenteDto,
    );
  }

  @Get()
  findAll() {
    return this.verificacionAccionesAccidentesService.findAll();
  }

  @Get('/verificacion/:id')
  ObtenerVerificacionByAccidente(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.verificacionAccionesAccidentesService.ObtenerVerificacionByAccidente(
      id,
      paginationDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateVerificacionAccionesAccidenteDto: UpdateVerificacionAccionesAccidenteDto,
  ) {
    return this.verificacionAccionesAccidentesService.update(
      +id,
      updateVerificacionAccionesAccidenteDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verificacionAccionesAccidentesService.remove(+id);
  }
}
