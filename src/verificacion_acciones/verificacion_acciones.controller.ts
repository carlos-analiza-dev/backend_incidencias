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
import { VerificacionAccionesService } from './verificacion_acciones.service';
import { CreateVerificacionAccioneDto } from './dto/create-verificacion_accione.dto';
import { UpdateVerificacionAccioneDto } from './dto/update-verificacion_accione.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Controller('verificacion-acciones-incidencia')
export class VerificacionAccionesController {
  constructor(
    private readonly verificacionAccionesService: VerificacionAccionesService,
  ) {}

  @Post()
  create(@Body() createVerificacionAccioneDto: CreateVerificacionAccioneDto) {
    return this.verificacionAccionesService.create(
      createVerificacionAccioneDto,
    );
  }

  @Get()
  findAll() {
    return this.verificacionAccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verificacionAccionesService.findOne(+id);
  }

  @Get('/verificacion/:id')
  ObtenerVerificacionByIncidencia(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.verificacionAccionesService.ObtenerVerificacionByIncidencia(
      id,
      paginationDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVerificacionAccioneDto: UpdateVerificacionAccioneDto,
  ) {
    return this.verificacionAccionesService.update(
      +id,
      updateVerificacionAccioneDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verificacionAccionesService.remove(+id);
  }
}
