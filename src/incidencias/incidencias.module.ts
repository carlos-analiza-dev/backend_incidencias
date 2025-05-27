import { Module } from '@nestjs/common';
import { IncidenciasService } from './incidencias.service';
import { IncidenciasController } from './incidencias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { Sucursale } from 'src/sucursales/entities/sucursale.entity';

@Module({
  controllers: [IncidenciasController],
  imports: [TypeOrmModule.forFeature([Incidencia, Sucursale])],
  providers: [IncidenciasService],
})
export class IncidenciasModule {}
