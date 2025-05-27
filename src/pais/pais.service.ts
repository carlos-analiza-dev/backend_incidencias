import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaiDto } from './dto/create-pai.dto';
import { UpdatePaiDto } from './dto/update-pai.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pai } from './entities/pai.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pai)
    private readonly paisRepository: Repository<Pai>,
  ) {}
  async create(createPaiDto: CreatePaiDto) {
    const { nombre_pais, code } = createPaiDto;
    try {
      if (!nombre_pais || !code) {
        throw new BadRequestException(
          'No se proporcionaron todos los datos para poder crear un pais.',
        );
      }
      const pais = this.paisRepository.create({
        nombre_pais,
        code,
      });
      await this.paisRepository.save(pais);
      return 'Pais creado exitosamente.';
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const paises = await this.paisRepository.find({});
      if (!paises || paises.length === 0)
        throw new BadRequestException(
          'No se encontraron paises en este momento',
        );
      return paises;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pai`;
  }

  update(id: number, updatePaiDto: UpdatePaiDto) {
    return `This action updates a #${id} pai`;
  }

  remove(id: number) {
    return `This action removes a #${id} pai`;
  }
}
