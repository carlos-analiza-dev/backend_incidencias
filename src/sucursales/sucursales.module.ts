import { Module } from '@nestjs/common';
import { SucursalesService } from './sucursales.service';
import { SucursalesController } from './sucursales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursale } from './entities/sucursale.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { Area } from 'src/area/entities/area.entity';

@Module({
  controllers: [SucursalesController],
  imports: [TypeOrmModule.forFeature([Sucursale, Pai, Area])],
  providers: [SucursalesService],
})
export class SucursalesModule {}
