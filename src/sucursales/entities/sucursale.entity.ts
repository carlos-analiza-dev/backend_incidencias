import { Accidente } from 'src/accidentes/entities/accidente.entity';
import { Area } from 'src/area/entities/area.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Incidencia } from 'src/incidencias/entities/incidencia.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sucursal')
export class Sucursale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  nombre: string;

  @Column({ type: 'varchar' })
  descripcion: string;

  @Column({ type: 'numeric', default: 1 })
  isActive: number;

  @ManyToOne(() => Pai)
  @JoinColumn({ name: 'paisId' })
  pais: Pai;

  @OneToMany(() => Incidencia, (inci) => inci.sucursal)
  incidencia: Incidencia[];

  @OneToMany(() => User, (usuario) => usuario.sucursal)
  usuario: User[];

  @ManyToOne(() => Area, { nullable: false })
  @JoinColumn({ name: 'areaId' })
  area: Area;

  @OneToMany(() => Accidente, (accidente) => accidente.sucursal)
  accidente: Accidente[];

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;
}
