import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccidenteDto } from './dto/create-accidente.dto';
import { UpdateAccidenteDto } from './dto/update-accidente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accidente } from './entities/accidente.entity';
import { Not, Repository } from 'typeorm';
import { Sucursale } from 'src/sucursales/entities/sucursale.entity';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { Categorias } from 'src/types/categorias.ype';

@Injectable()
export class AccidentesService {
  constructor(
    @InjectRepository(Accidente)
    private readonly accidenteRepository: Repository<Accidente>,
    @InjectRepository(Sucursale)
    private readonly sucursalRepo: Repository<Sucursale>,
  ) {}
  async create(createAccidenteDto: CreateAccidenteDto) {
    const { sucursalId, ...resto } = createAccidenteDto;
    try {
      const sucursal = await this.sucursalRepo.findOneBy({ id: sucursalId });
      if (!sucursal) {
        throw new BadRequestException(
          'No se encontró la sucursal seleccionada.',
        );
      }

      const accidente = this.accidenteRepository.create({
        ...resto,
        sucursal,
      });

      await this.accidenteRepository.save(accidente);
      return 'Accidente Reportado Exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const [accidentes, total] = await this.accidenteRepository.findAndCount({
        skip: offset,
        take: limit,
        order: {
          fechaIncidente: 'DESC',
        },
      });
      if (!accidentes || accidentes.length === 0) {
        throw new NotFoundException(
          'No se encontraron accidentes disponibles en este momento.',
        );
      }
      return {
        data: accidentes,
        total,
        offset,
        limit,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAccidentesBySucursal(
    paginationDto: PaginationDto,
    sucursalId: string,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const sucursal = await this.sucursalRepo.findOne({
        where: { id: sucursalId },
      });
      if (!sucursal)
        throw new BadRequestException(
          'No se encontro la sucursal seleccionada.',
        );

      const [accidentesBySucursal, total] =
        await this.accidenteRepository.findAndCount({
          skip: offset,
          take: limit,
          where: {
            sucursal: sucursal,
          },
        });
      if (!accidentesBySucursal || accidentesBySucursal.length === 0) {
        throw new BadRequestException(
          'No se encontraron accidentes en este momento',
        );
      }

      return {
        data: accidentesBySucursal,
        total,
        offset,
        limit,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} accidente`;
  }

  async update(id: string, updateAccidenteDto: UpdateAccidenteDto) {
    const accidente = await this.accidenteRepository.findOne({
      where: { id },
      relations: ['sucursal'],
    });

    if (!accidente) {
      throw new NotFoundException(
        `No se encontró un accidente con el id: ${id}`,
      );
    }

    const { sucursalId, ...resto } = updateAccidenteDto;

    if (sucursalId) {
      const sucursal = await this.sucursalRepo.findOneBy({ id: sucursalId });
      if (!sucursal) {
        throw new BadRequestException('Sucursal no válida.');
      }
      accidente.sucursal = sucursal;
    }

    Object.assign(accidente, resto);

    await this.accidenteRepository.save(accidente);
    return {
      message: 'Accidente actualizado correctamente',
      data: accidente,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} accidente`;
  }
}
