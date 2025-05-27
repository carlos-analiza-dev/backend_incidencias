import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [AreaController],
  imports: [TypeOrmModule.forFeature([Area, Pai, User])],
  providers: [AreaService],
})
export class AreaModule {}
