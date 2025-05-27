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

@Entity('acciones_preventivas_accidentes')
export class ImplementacionAccionesAccidente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  acciones_tomadas: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'responsable_aplicar_correcciones_id' })
  responsable_aplicar_correcciones: User;

  @Column({ type: 'date' })
  fecha_limite_implementacion: Date;

  @ManyToOne(() => Accidente, (incidencia) => incidencia.accionesPreventivas)
  @JoinColumn({ name: 'accidente_accion_id' })
  accidente: Accidente;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usuario_accion_id' })
  usuario_reporta: User;

  @CreateDateColumn()
  fecha_creacion: Date;
}
