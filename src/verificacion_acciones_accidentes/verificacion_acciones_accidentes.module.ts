import { Module } from '@nestjs/common';
import { VerificacionAccionesAccidentesService } from './verificacion_acciones_accidentes.service';
import { VerificacionAccionesAccidentesController } from './verificacion_acciones_accidentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificacionAccionesAccidente } from './entities/verificacion_acciones_accidente.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Accidente } from 'src/accidentes/entities/accidente.entity';

@Module({
  controllers: [VerificacionAccionesAccidentesController],
  imports: [
    TypeOrmModule.forFeature([VerificacionAccionesAccidente, User, Accidente]),
  ],
  providers: [VerificacionAccionesAccidentesService],
})
export class VerificacionAccionesAccidentesModule {}
