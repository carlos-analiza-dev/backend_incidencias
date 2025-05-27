import { AccionPreventiva } from 'src/implementacion_acciones/entities/implementacion_accione.entity';
import { Sucursale } from 'src/sucursales/entities/sucursale.entity';
import { Categorias } from 'src/types/categorias.ype';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('incidencia')
export class Incidencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  area: string;

  @Column({ type: 'date' })
  fecha_incidente: Date;

  @Column({ type: 'varchar', length: 50 })
  hora: string;

  @Column({ type: 'varchar', length: 455 })
  descripcion: string;

  @Column({ type: 'enum', enum: Categorias, default: Categorias.NO_DEFINIDA })
  categoria: Categorias;

  @Column({ type: 'varchar', default: 'Sin correo' })
  correo: string;

  @ManyToOne(() => Sucursale, { eager: true })
  @JoinColumn({ name: 'sucursalId' })
  sucursal: Sucursale;

  @OneToMany(() => AccionPreventiva, (accion) => accion.incidente)
  accionesPreventivas: AccionPreventiva[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_reporte: Date;
}
