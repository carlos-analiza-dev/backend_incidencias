import { Sucursale } from 'src/sucursales/entities/sucursale.entity';
import { Categorias } from 'src/types/categorias.ype';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('accidente')
export class Accidente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  area: string;

  @ManyToOne(() => Sucursale, { nullable: false })
  @JoinColumn({ name: 'sucursalId' })
  sucursal: Sucursale;

  @Column({ type: 'varchar', length: 255 })
  nombreNotificante: string;

  @Column({ type: 'varchar', length: 255 })
  cargoNotificante: string;

  @Column({ type: 'varchar', length: 255 })
  nombreAfectado: string;

  @Column({ type: 'varchar', length: 50 })
  dniAfectado: string;

  @Column({ type: 'date' })
  fechaIncidente: Date;

  @Column({ type: 'varchar', length: 50 })
  hora: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'numeric', default: 0 })
  enPuesto?: number;

  @Column({ type: 'numeric', default: 0 })
  laboresHabituales?: number;

  @Column({ type: 'numeric', default: 0 })
  detallaParteCuerpo?: number;

  @Column({ type: 'numeric', default: 0 })
  usoEPPCompleto?: number;

  @Column({ type: 'text', default: 'Sin descripcion' })
  descripcionEPP?: string;

  @Column({ type: 'numeric', default: 0 })
  exigeAtencionJefeLab?: number;

  @Column({ type: 'text', default: 'ND' })
  accionTomada?: string;

  @Column({ type: 'text', default: 'ND' })
  observaciones?: string;

  @Column({ type: 'varchar', length: 255, default: 'ND' })
  correo?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaReporte: Date;

  @Column({ type: 'enum', enum: Categorias, default: Categorias.NO_DEFINIDA })
  categoria: Categorias;
}
