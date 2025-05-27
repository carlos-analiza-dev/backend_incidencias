import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVerificacionAccionesAccidenteDto } from './dto/create-verificacion_acciones_accidente.dto';
import { UpdateVerificacionAccionesAccidenteDto } from './dto/update-verificacion_acciones_accidente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificacionAccionesAccidente } from './entities/verificacion_acciones_accidente.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Accidente } from 'src/accidentes/entities/accidente.entity';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class VerificacionAccionesAccidentesService {
  constructor(
    @InjectRepository(VerificacionAccionesAccidente)
    private readonly verificacione_acciones_repo: Repository<VerificacionAccionesAccidente>,
    @InjectRepository(User)
    private readonly user_repo: Repository<User>,
    @InjectRepository(Accidente)
    private readonly accidente_repo: Repository<Accidente>,
  ) {}
  async create(
    createVerificacionAccionesAccidenteDto: CreateVerificacionAccionesAccidenteDto,
  ) {
    const {
      accidente,
      fecha_verificacion,
      responsable_aplicar_correcciones,
      usuario_reporta,
      resultado,
    } = createVerificacionAccionesAccidenteDto;
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

      const incidencia_exist = await this.accidente_repo.findOne({
        where: { id: accidente },
      });
      if (!incidencia_exist)
        throw new BadRequestException(
          'No se encontro el accidente seleccionada.',
        );

      const verificacion_accion = this.verificacione_acciones_repo.create({
        fecha_verificacion,
        resultado,
        accidente: incidencia_exist,
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
    return `This action returns all verificacionAccionesAccidentes`;
  }

  async ObtenerVerificacionByAccidente(
    id: string,
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const [verificaciones_accidente, total] =
        await this.verificacione_acciones_repo.findAndCount({
          where: {
            accidente: {
              id: id,
            },
          },
          skip: offset,
          take: limit,
          order: {
            fecha_creacion: 'DESC',
          },
        });
      if (!verificaciones_accidente || verificaciones_accidente.length === 0) {
        throw new NotFoundException(
          'No se encontraron verificaciones para este accidente',
        );
      }

      return {
        data: instanceToPlain(verificaciones_accidente),
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  update(
    id: number,
    updateVerificacionAccionesAccidenteDto: UpdateVerificacionAccionesAccidenteDto,
  ) {
    return `This action updates a #${id} verificacionAccionesAccidente`;
  }

  remove(id: number) {
    return `This action removes a #${id} verificacionAccionesAccidente`;
  }
}
