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
import { ImplementacionAccionesService } from './implementacion_acciones.service';
import { CreateImplementacionAccioneDto } from './dto/create-implementacion_accione.dto';
import { UpdateImplementacionAccioneDto } from './dto/update-implementacion_accione.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Controller('implementacion-acciones-incidencias')
export class ImplementacionAccionesController {
  constructor(
    private readonly implementacionAccionesService: ImplementacionAccionesService,
  ) {}

  @Post()
  create(
    @Body() createImplementacionAccioneDto: CreateImplementacionAccioneDto,
  ) {
    return this.implementacionAccionesService.create(
      createImplementacionAccioneDto,
    );
  }

  @Get()
  findAll() {
    return this.implementacionAccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.implementacionAccionesService.findOne(+id);
  }

  @Get('/acciones-implementadas-incidencia/:id')
  AccionesByIncidencia(
    @Param('id') id: string,
    @Query() paginationDato: PaginationDto,
  ) {
    return this.implementacionAccionesService.accionesByIncidencia(
      id,
      paginationDato,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImplementacionAccioneDto: UpdateImplementacionAccioneDto,
  ) {
    return this.implementacionAccionesService.update(
      +id,
      updateImplementacionAccioneDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.implementacionAccionesService.remove(+id);
  }
}
