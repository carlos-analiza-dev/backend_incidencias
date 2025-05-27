import { Module } from '@nestjs/common';
import { ImplementacionAccionesService } from './implementacion_acciones.service';
import { ImplementacionAccionesController } from './implementacion_acciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccionPreventiva } from './entities/implementacion_accione.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Incidencia } from 'src/incidencias/entities/incidencia.entity';

@Module({
  controllers: [ImplementacionAccionesController],
  imports: [TypeOrmModule.forFeature([AccionPreventiva, User, Incidencia])],
  providers: [ImplementacionAccionesService],
})
export class ImplementacionAccionesModule {}
