import { User } from 'src/auth/entities/auth.entity';
import { Incidencia } from 'src/incidencias/entities/incidencia.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('acciones_preventivas_incidentes')
export class AccionPreventiva {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  acciones_tomadas: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'responsable_aplicar_correcciones_id' })
  responsable_aplicar_correcciones: User;

  @Column({ type: 'date' })
  fecha_limite_implementacion: Date;

  @ManyToOne(() => Incidencia, (incidencia) => incidencia.accionesPreventivas)
  @JoinColumn({ name: 'incidente_accion_id' })
  incidente: Incidencia;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usuario_accion_id' })
  usuario_reporta: User;

  @CreateDateColumn()
  fecha_creacion: Date;
}
