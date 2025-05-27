import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pai } from 'src/pais/entities/pai.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Area } from './entities/area.entity';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Pai)
    private readonly paisRepo: Repository<Pai>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Area)
    private readonly areaRepo: Repository<Area>,
  ) {}
  async create(createAreaDto: CreateAreaDto) {
    const { nombre, paisId, gerenteId } = createAreaDto;

    const pais = await this.paisRepo.findOneBy({ id: paisId });
    const gerente = await this.userRepo.findOneBy({ id: gerenteId });

    if (!pais || !gerente) {
      throw new BadRequestException('País o gerente no encontrado');
    }

    const area = this.areaRepo.create({
      nombre,
      pais,
      gerente,
    });

    await this.areaRepo.save(area);

    return 'Area creada exitosamente';
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const [area, total] = await this.areaRepo.findAndCount({
        skip: offset,
        take: limit,
      });
      if (!area || area.length === 0) {
        throw new BadRequestException(
          'No se encontraron areas disponibles en este momento.',
        );
      }
      return {
        area,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
