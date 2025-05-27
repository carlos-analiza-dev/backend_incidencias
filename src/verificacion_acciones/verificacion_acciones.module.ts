import { Module } from '@nestjs/common';
import { VerificacionAccionesService } from './verificacion_acciones.service';
import { VerificacionAccionesController } from './verificacion_acciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificacionAccioneIncidencia } from './entities/verificacion_accione.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Incidencia } from 'src/incidencias/entities/incidencia.entity';

@Module({
  controllers: [VerificacionAccionesController],
  imports: [
    TypeOrmModule.forFeature([VerificacionAccioneIncidencia, User, Incidencia]),
  ],
  providers: [VerificacionAccionesService],
})
export class VerificacionAccionesModule {}
