import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { Sucursale } from 'src/sucursales/entities/sucursale.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailService } from 'src/mail/mail.service';
import { Area } from 'src/area/entities/area.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailService],
  exports: [TypeOrmModule, JwtModule, PassportModule],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Pai, Sucursale, Area]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '12h',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
