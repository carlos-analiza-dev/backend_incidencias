import { Module } from '@nestjs/common';
import { AccidentesService } from './accidentes.service';
import { AccidentesController } from './accidentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accidente } from './entities/accidente.entity';
import { Sucursale } from 'src/sucursales/entities/sucursale.entity';

@Module({
  controllers: [AccidentesController],
  imports: [TypeOrmModule.forFeature([Accidente, Sucursale])],
  providers: [AccidentesService],
})
export class AccidentesModule {}
