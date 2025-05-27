import { Accidente } from 'src/accidentes/entities/accidente.entity';
import { User } from 'src/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('verificacion_acciones_accidentes')
export class VerificacionAccionesAccidente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  resultado: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'responsable_verificar_acciones_id' })
  responsable_aplicar_correcciones: User;

  @Column({ type: 'date' })
  fecha_verificacion: Date;

  @ManyToOne(() => Accidente, (incidencia) => incidencia.accionesPreventivas)
  @JoinColumn({ name: 'accidente_accion_id' })
  accidente: Accidente;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usuario_accion_id' })
  usuario_reporta: User;

  @CreateDateColumn()
  fecha_creacion: Date;
}
