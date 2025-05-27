import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImplementacionAccionesAccidenteDto } from './dto/create-implementacion_acciones_accidente.dto';
import { UpdateImplementacionAccionesAccidenteDto } from './dto/update-implementacion_acciones_accidente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { ImplementacionAccionesAccidente } from './entities/implementacion_acciones_accidente.entity';
import { Repository } from 'typeorm';
import { Accidente } from 'src/accidentes/entities/accidente.entity';

@Injectable()
export class ImplementacionAccionesAccidentesService {
  constructor(
    @InjectRepository(ImplementacionAccionesAccidente)
    private readonly acciones_Repo: Repository<ImplementacionAccionesAccidente>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Accidente)
    private readonly accidenteRepo: Repository<Accidente>,
  ) {}
  async create(
    createImplementacionAccionesAccidenteDto: CreateImplementacionAccionesAccidenteDto,
  ) {
    const {
      acciones_tomadas,
      accidente_accion_id,
      fecha_limite_implementacion,
      responsable_aplicar_correcciones_id,
      usuario_accion_id,
    } = createImplementacionAccionesAccidenteDto;
    try {
      const user_responseble = await this.userRepo.findOne({
        where: { id: responsable_aplicar_correcciones_id },
      });
      if (!user_responseble)
        throw new BadRequestException(
          'No se encontro el usuario que se selecciono como responsable',
        );

      const user_creador_accion = await this.userRepo.findOne({
        where: { id: usuario_accion_id },
      });
      if (!user_creador_accion)
        throw new BadRequestException(
          'No se encontro el usuario que se esta creando esta accion',
        );

      const accidente_exits = await this.accidenteRepo.findOne({
        where: { id: accidente_accion_id },
      });
      if (!accidente_exits)
        throw new BadRequestException(
          'No se encontro el accidente seleccionada',
        );

      const accion_accidente = this.acciones_Repo.create({
        acciones_tomadas,
        fecha_limite_implementacion,
        responsable_aplicar_correcciones: user_responseble,
        usuario_reporta: user_creador_accion,
        accidente: accidente_exits,
      });
      await this.acciones_Repo.save(accion_accidente);
      return 'Accion creada exitosamente';
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all implementacionAccionesAccidentes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} implementacionAccionesAccidente`;
  }

  update(
    id: number,
    updateImplementacionAccionesAccidenteDto: UpdateImplementacionAccionesAccidenteDto,
  ) {
    return `This action updates a #${id} implementacionAccionesAccidente`;
  }

  remove(id: number) {
    return `This action removes a #${id} implementacionAccionesAccidente`;
  }
}
