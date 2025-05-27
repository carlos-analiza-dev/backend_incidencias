import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Sucursale } from 'src/sucursales/entities/sucursale.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt.payload.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MailService } from 'src/mail/mail.service';
import { Area } from 'src/area/entities/area.entity';
import { PaginationDto } from '../common/dto/pagination-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Sucursale)
    private readonly sucursalRepo: Repository<Sucursale>,
    @InjectRepository(Pai)
    private readonly paisRepo: Repository<Pai>,
    @InjectRepository(Area)
    private readonly areaRepo: Repository<Area>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const {
      email,
      name,
      password,
      telefono,
      rol,
      sucursal,
      pais,
      direccion,
      identificacion,
      area,
    } = createUserDto;
    try {
      const sucursal_exist = await this.sucursalRepo.findOne({
        where: { id: sucursal },
      });
      if (!sucursal_exist)
        throw new BadRequestException(
          'No se encontro la sucursal seleccionada.',
        );
      const pais_exist = await this.paisRepo.findOne({ where: { id: pais } });
      if (!pais_exist)
        throw new BadRequestException('No se encontro el pais seleccionado.');

      const area_exist = await this.areaRepo.findOne({ where: { id: area } });
      if (!area_exist)
        throw new BadRequestException('No se encontro el area seleccionada.');

      const user = this.userRepository.create({
        email: email,
        password: bcrypt.hashSync(password, 10),
        name: name,
        telefono,
        rol,
        direccion,
        identificacion,
        pais: pais_exist,
        sucursal: sucursal_exist,
        area: area_exist,
      });
      await this.userRepository.save(user);
      delete user.password;

      return user;
    } catch (error) {
      console.log(error);
      this.captureError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new UnauthorizedException('Credenciales incorrectas (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales incorrectas (contrasena)');

    if (user.IsActive === false) {
      throw new UnauthorizedException(
        'Este usuario se encuentra inactivo, contacte con el administrador',
      );
    }

    if (user.IsAuthorized === false) {
      throw new UnauthorizedException(
        'Este usuario no esta autorizado, contacte con el administrador',
      );
    }

    delete user.password;

    return { ...user, token: this.getJwlPayload({ id: user.id }) };
  }

  async actualizarContrasena(updatePassword: UpdatePasswordDto) {
    console.log({ updatePassword });

    const { email, nuevaContrasena } = updatePassword;
    const usuario = await this.userRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException('El correo no existe en la base de datos');
    }

    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    usuario.password = hashedPassword;

    await this.mailService.sendEmailConfirm(email, nuevaContrasena);
    await this.userRepository.save(usuario);
    return 'Contraseña actualizada exitosamente';
  }

  async obtenerUsuarios(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, pais, sucursal } = paginationDto;
    try {
      const pais_exist = await this.paisRepo.findOne({ where: { id: pais } });
      if (!pais_exist)
        throw new NotFoundException('El pais seleccionado no existe');

      const sucursal_exist = await this.sucursalRepo.findOne({
        where: { id: sucursal },
      });
      if (!sucursal_exist)
        throw new NotFoundException('La sucursal seleccionada no existe');

      const [usuarios, total] = await this.userRepository.findAndCount({
        skip: offset,
        take: limit,
        where: {
          pais: { id: pais },
          sucursal: { id: sucursal },
        },
      });

      if (!usuarios || usuarios.length === 0) {
        throw new BadRequestException(
          'No se encontraron usuarios disponibles en este momento',
        );
      }

      const usuarios_map = usuarios.map(({ password, ...rest }) => rest);

      return { usuarios: usuarios_map, total };
    } catch (error) {
      throw error;
    }
  }

  async searchUsers(paginationDto: PaginationDto) {
    const { name } = paginationDto;
    try {
      if (!name || name.trim() === '') {
        throw new BadRequestException(
          'El nombre es requerido para la búsqueda',
        );
      }

      const usuarios = await this.userRepository.find({
        where: { name: ILike(`%${name}%`) },
      });

      if (usuarios.length === 0) {
        throw new NotFoundException(
          'No se encontraron usuarios con ese nombre',
        );
      }

      const usuarios_sin_password = usuarios.map(
        ({ password, ...rest }) => rest,
      );

      return usuarios_sin_password;
    } catch (error) {
      throw error;
    }
  }

  private getJwlPayload(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private captureError(error: any) {
    if (error.code === '23505') throw new NotFoundException(error.detail);
    throw new InternalServerErrorException(
      'Hubo un error interno en el servidor',
    );
  }
}
