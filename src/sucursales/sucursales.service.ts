import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSucursaleDto } from './dto/create-sucursale.dto';
import { UpdateSucursaleDto } from './dto/update-sucursale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursale } from './entities/sucursale.entity';
import { Repository } from 'typeorm';
import { Pai } from 'src/pais/entities/pai.entity';
import { Area } from 'src/area/entities/area.entity';

@Injectable()
export class SucursalesService {
  constructor(
    @InjectRepository(Sucursale)
    private readonly sucursalRepository: Repository<Sucursale>,
    @InjectRepository(Pai)
    private readonly paisRepository: Repository<Pai>,
    @InjectRepository(Area)
    private readonly areaRepo: Repository<Area>,
  ) {}
  async create(createSucursaleDto: CreateSucursaleDto) {
    const { nombre, descripcion, paisId, areaId } = createSucursaleDto;
    try {
      const exis_pais = await this.paisRepository.findOne({
        where: { id: paisId },
      });
      if (!exis_pais)
        throw new NotFoundException('No se encontro el pais seleccionado.');

      const area_exist = await this.areaRepo.findOne({
        where: { id: areaId },
      });
      if (!area_exist)
        throw new NotFoundException('No se encontro el area seleccionado.');

      const sucursal = this.sucursalRepository.create({
        nombre,
        descripcion,
        pais: exis_pais,
        area: area_exist,
      });
      await this.sucursalRepository.save(sucursal);
      return 'Sucursal Creada Exitosamente.';
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const sucursales = await this.sucursalRepository.find({});
      if (!sucursales || sucursales.length === 0) {
        throw new NotFoundException(
          'No se encontraron sucursales disponibles.',
        );
      }
      return sucursales;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} sucursale`;
  }

  update(id: number, updateSucursaleDto: UpdateSucursaleDto) {
    return `This action updates a #${id} sucursale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sucursale`;
  }
}
