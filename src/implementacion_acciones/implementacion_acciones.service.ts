import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateImplementacionAccioneDto } from './dto/create-implementacion_accione.dto';
import { UpdateImplementacionAccioneDto } from './dto/update-implementacion_accione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { AccionPreventiva } from './entities/implementacion_accione.entity';
import { Incidencia } from 'src/incidencias/entities/incidencia.entity';
import { instanceToPlain } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Injectable()
export class ImplementacionAccionesService {
  constructor(
    @InjectRepository(AccionPreventiva)
    private readonly acciones_Repo: Repository<AccionPreventiva>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Incidencia)
    private readonly incidenciRepo: Repository<Incidencia>,
  ) {}
  async create(createImplementacionAccioneDto: CreateImplementacionAccioneDto) {
    const {
      acciones_tomadas,
      fecha_limite_implementacion,
      responsable_aplicar_correcciones_id,
      usuario_accion_id,
      incidente_accion_id,
    } = createImplementacionAccioneDto;
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

      const incidencia_exits = await this.incidenciRepo.findOne({
        where: { id: incidente_accion_id },
      });
      if (!incidencia_exits)
        throw new BadRequestException('No se encontro incidencia seleccionada');

      const accion_incidencia = this.acciones_Repo.create({
        acciones_tomadas,
        fecha_limite_implementacion,
        responsable_aplicar_correcciones: user_responseble,
        usuario_reporta: user_creador_accion,
        incidente: incidencia_exits,
      });
      await this.acciones_Repo.save(accion_incidencia);
      return 'Accion creada exitosamente';
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all implementacionAcciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} implementacionAccione`;
  }

  async accionesByIncidencia(id: string, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      const [acciones_incidencias, total] =
        await this.acciones_Repo.findAndCount({
          where: { incidente: { id: id } },
          skip: offset,
          take: limit,
          order: { fecha_creacion: 'DESC' },
        });

      if (!acciones_incidencias || acciones_incidencias.length === 0) {
        throw new NotFoundException(
          'No se encontraron acciones disponibles para esta incidencia',
        );
      }

      return {
        total,
        data: instanceToPlain(acciones_incidencias),
      };
    } catch (error) {
      throw error;
    }
  }

  update(
    id: number,
    updateImplementacionAccioneDto: UpdateImplementacionAccioneDto,
  ) {
    return `This action updates a #${id} implementacionAccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} implementacionAccione`;
  }
}
