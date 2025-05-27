import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { Not, Repository } from 'typeorm';
import { Sucursale } from 'src/sucursales/entities/sucursale.entity';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { Categorias } from 'src/types/categorias.ype';

@Injectable()
export class IncidenciasService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepo: Repository<Incidencia>,
    @InjectRepository(Sucursale)
    private readonly sucursalRepo: Repository<Sucursale>,
  ) {}
  async create(createIncidenciaDto: CreateIncidenciaDto) {
    const { area, correo, descripcion, fecha_incidente, hora, sucursalId } =
      createIncidenciaDto;
    try {
      const sucursal = await this.sucursalRepo.findOne({
        where: { id: sucursalId },
      });
      if (!sucursal)
        throw new NotFoundException('No se encontro la sucursal seleccionada.');

      const incidencia = this.incidenciaRepo.create({
        area,
        correo,
        descripcion,
        fecha_incidente,
        hora,
        sucursal: sucursal,
      });
      await this.incidenciaRepo.save(incidencia);
      return 'Incidencia Guardada Exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const [incidencias, total] = await this.incidenciaRepo.findAndCount({
        skip: offset,
        take: limit,
      });

      if (!incidencias || incidencias.length === 0) {
        throw new NotFoundException('No se encontraron incapacidades.');
      }

      return {
        incidencias,
        total,
        limit,
        offset,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAllBySucursal(paginationDto: PaginationDto, sucursalId: string) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const sucursal = await this.sucursalRepo.findOne({
        where: { id: sucursalId },
      });
      if (!sucursal)
        throw new NotFoundException('No se encontro la sucursal seleccionada');
      const [incidencias, total] = await this.incidenciaRepo.findAndCount({
        skip: offset,
        take: limit,
        where: {
          sucursal,
        },
      });

      if (!incidencias || incidencias.length === 0) {
        throw new NotFoundException('No se encontraron incapacidades.');
      }

      return {
        incidencias,
        total,
        limit,
        offset,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} incidencia`;
  }

  async update(id: string, updateIncidenciaDto: UpdateIncidenciaDto) {
    const incidencia = await this.incidenciaRepo.findOne({
      where: { id },
      relations: ['sucursal'],
    });

    if (!incidencia) {
      throw new NotFoundException(`No se encontró la incidencia con ID ${id}`);
    }

    if (updateIncidenciaDto.sucursalId) {
      const sucursal = await this.sucursalRepo.findOne({
        where: { id: updateIncidenciaDto.sucursalId },
      });

      if (!sucursal) {
        throw new NotFoundException(
          'No se encontró la sucursal con el ID proporcionado.',
        );
      }

      incidencia.sucursal = sucursal;
    }
    Object.assign(incidencia, {
      area: updateIncidenciaDto.area ?? incidencia.area,
      correo: updateIncidenciaDto.correo ?? incidencia.correo,
      descripcion: updateIncidenciaDto.descripcion ?? incidencia.descripcion,
      fecha_incidente:
        updateIncidenciaDto.fecha_incidente ?? incidencia.fecha_incidente,
      hora: updateIncidenciaDto.hora ?? incidencia.hora,
      categoria: updateIncidenciaDto.categoria ?? incidencia.categoria,
    });

    await this.incidenciaRepo.save(incidencia);

    return {
      message: 'Incidencia actualizada exitosamente',
      incidencia,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} incidencia`;
  }
}
