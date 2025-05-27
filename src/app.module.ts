import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { IncidenciasModule } from './incidencias/incidencias.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { PaisModule } from './pais/pais.module';
import { AccidentesModule } from './accidentes/accidentes.module';
import { MailModule } from './mail/mail.module';
import { CommonModule } from './common/common.module';
import { AreaModule } from './area/area.module';
import { ImplementacionAccionesModule } from './implementacion_acciones/implementacion_acciones.module';
import { VerificacionAccionesModule } from './verificacion_acciones/verificacion_acciones.module';
import { ImplementacionAccionesAccidentesModule } from './implementacion_acciones_accidentes/implementacion_acciones_accidentes.module';
import { VerificacionAccionesAccidentesModule } from './verificacion_acciones_accidentes/verificacion_acciones_accidentes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    IncidenciasModule,
    SucursalesModule,
    PaisModule,
    AccidentesModule,
    MailModule,
    CommonModule,
    AreaModule,
    ImplementacionAccionesModule,
    VerificacionAccionesModule,
    ImplementacionAccionesAccidentesModule,
    VerificacionAccionesAccidentesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
