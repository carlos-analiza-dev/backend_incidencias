import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/interfaces/jwt.payload.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UnauthorizedException('Token invalido');
    if (!user.IsActive)
      throw new UnauthorizedException(
        'El usuario no esta activo, contactese con el administrador',
      );

    return user;
  }
}
