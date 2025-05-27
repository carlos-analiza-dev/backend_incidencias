import { Module } from '@nestjs/common';
import { ImplementacionAccionesAccidentesService } from './implementacion_acciones_accidentes.service';
import { ImplementacionAccionesAccidentesController } from './implementacion_acciones_accidentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImplementacionAccionesAccidente } from './entities/implementacion_acciones_accidente.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Accidente } from 'src/accidentes/entities/accidente.entity';

@Module({
  controllers: [ImplementacionAccionesAccidentesController],
  imports: [
    TypeOrmModule.forFeature([
      ImplementacionAccionesAccidente,
      User,
      Accidente,
    ]),
  ],
  providers: [ImplementacionAccionesAccidentesService],
})
export class ImplementacionAccionesAccidentesModule {}
