import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AccidentesService } from './accidentes.service';
import { CreateAccidenteDto } from './dto/create-accidente.dto';
import { UpdateAccidenteDto } from './dto/update-accidente.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Controller('accidentes')
export class AccidentesController {
  constructor(private readonly accidentesService: AccidentesService) {}

  @Post()
  create(@Body() createAccidenteDto: CreateAccidenteDto) {
    return this.accidentesService.create(createAccidenteDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.accidentesService.findAll(paginationDto);
  }

  @Get('/sucursal/:sucursalId')
  getAccidentesBySucursal(
    @Query() paginationDto: PaginationDto,
    @Param('sucursalId', ParseUUIDPipe) sucursalId: string,
  ) {
    return this.accidentesService.getAccidentesBySucursal(
      paginationDto,
      sucursalId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accidentesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccidenteDto: UpdateAccidenteDto,
  ) {
    return this.accidentesService.update(id, updateAccidenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accidentesService.remove(+id);
  }
}
