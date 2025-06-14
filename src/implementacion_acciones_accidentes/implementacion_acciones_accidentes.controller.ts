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
import { ImplementacionAccionesAccidentesService } from './implementacion_acciones_accidentes.service';
import { CreateImplementacionAccionesAccidenteDto } from './dto/create-implementacion_acciones_accidente.dto';
import { UpdateImplementacionAccionesAccidenteDto } from './dto/update-implementacion_acciones_accidente.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Controller('implementacion-acciones-accidentes')
export class ImplementacionAccionesAccidentesController {
  constructor(
    private readonly implementacionAccionesAccidentesService: ImplementacionAccionesAccidentesService,
  ) {}

  @Post()
  create(
    @Body()
    createImplementacionAccionesAccidenteDto: CreateImplementacionAccionesAccidenteDto,
  ) {
    return this.implementacionAccionesAccidentesService.create(
      createImplementacionAccionesAccidenteDto,
    );
  }

  @Get()
  findAll() {
    return this.implementacionAccionesAccidentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.implementacionAccionesAccidentesService.findOne(+id);
  }

  @Get('/acciones/:id')
  ObtenerAccionesByAccidente(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.implementacionAccionesAccidentesService.ObtenerAccionesByAccidente(
      id,
      paginationDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateImplementacionAccionesAccidenteDto: UpdateImplementacionAccionesAccidenteDto,
  ) {
    return this.implementacionAccionesAccidentesService.update(
      +id,
      updateImplementacionAccionesAccidenteDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.implementacionAccionesAccidentesService.remove(+id);
  }
}
