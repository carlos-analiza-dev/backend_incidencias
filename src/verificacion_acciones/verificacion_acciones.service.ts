import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVerificacionAccioneDto } from './dto/create-verificacion_accione.dto';
import { UpdateVerificacionAccioneDto } from './dto/update-verificacion_accione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificacionAccioneIncidencia } from './entities/verificacion_accione.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Incidencia } from 'src/incidencias/entities/incidencia.entity';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class VerificacionAccionesService {
  constructor(
    @InjectRepository(VerificacionAccioneIncidencia)
    private readonly verificacione_acciones_repo: Repository<VerificacionAccioneIncidencia>,
    @InjectRepository(User)
    private readonly user_repo: Repository<User>,
    @InjectRepository(Incidencia)
    private readonly incidencia_repo: Repository<Incidencia>,
  ) {}
  async create(createVerificacionAccioneDto: CreateVerificacionAccioneDto) {
    const {
      fecha_verificacion,
      incidente,
      responsable_aplicar_correcciones,
      usuario_reporta,
      resultado,
    } = createVerificacionAccioneDto;

    try {
      const responsable_exist = await this.user_repo.findOne({
        where: { id: responsable_aplicar_correcciones },
      });
      if (!responsable_exist)
        throw new BadRequestException(
          'No se encontro el responsable seleccionado en estos momentos.',
        );

      const user_resporta_exist = await this.user_repo.findOne({
        where: { id: usuario_reporta },
      });
      if (!user_resporta_exist)
        throw new BadRequestException(
          'No se encontro el usuario que reporta la verificacion.',
        );

      const incidencia_exist = await this.incidencia_repo.findOne({
        where: { id: incidente },
      });
      if (!incidencia_exist)
        throw new BadRequestException(
          'No se encontro la incidencia seleccionada.',
        );

      const verificacion_accion = this.verificacione_acciones_repo.create({
        fecha_verificacion,
        resultado,
        incidente: incidencia_exist,
        responsable_aplicar_correcciones: responsable_exist,
        usuario_reporta: user_resporta_exist,
      });

      await this.verificacione_acciones_repo.save(verificacion_accion);

      return 'Verificacion de accion creada con exito.';
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all verificacionAcciones`;
  }

  async ObtenerVerificacionByIncidencia(
    id: string,
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const [verificaciones_incidecias, total] =
        await this.verificacione_acciones_repo.findAndCount({
          where: {
            incidente: {
              id: id,
            },
          },
          skip: offset,
          take: limit,
        });
      if (
        !verificaciones_incidecias ||
        verificaciones_incidecias.length === 0
      ) {
        throw new NotFoundException(
          'No se encontraron verificaciones para esta incidencia',
        );
      }

      return {
        data: instanceToPlain(verificaciones_incidecias),
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} verificacionAccione`;
  }

  update(
    id: number,
    updateVerificacionAccioneDto: UpdateVerificacionAccioneDto,
  ) {
    return `This action updates a #${id} verificacionAccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} verificacionAccione`;
  }
}
