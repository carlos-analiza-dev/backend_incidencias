import { User } from 'src/auth/entities/auth.entity';
import { Incidencia } from 'src/incidencias/entities/incidencia.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('verificacion_acciones_incidencias')
export class VerificacionAccioneIncidencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  resultado: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'responsable_verificar_acciones_id' })
  responsable_aplicar_correcciones: User;

  @Column({ type: 'date' })
  fecha_verificacion: Date;

  @ManyToOne(() => Incidencia, (incidencia) => incidencia.accionesPreventivas)
  @JoinColumn({ name: 'incidente_accion_id' })
  incidente: Incidencia;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usuario_accion_id' })
  usuario_reporta: User;

  @CreateDateColumn()
  fecha_creacion: Date;
}
