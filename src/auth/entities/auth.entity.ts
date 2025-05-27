import { Exclude } from 'class-transformer';
import { Area } from 'src/area/entities/area.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { Sucursale } from 'src/sucursales/entities/sucursale.entity';
import { UserRole } from 'src/types/user.role.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Exclude()
  @Column('text', { select: true })
  password: string;

  @Column('text')
  name: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar', unique: true })
  telefono: string;

  @Column({ type: 'varchar', unique: true })
  identificacion: string;

  @ManyToOne(() => Pai, { eager: true })
  @JoinColumn({ name: 'paisId' })
  pais: Pai;

  @ManyToOne(() => Sucursale, { eager: true })
  @JoinColumn({ name: 'sucursalId' })
  sucursal: Sucursale;

  @ManyToOne(() => Area, { eager: true })
  @JoinColumn({ name: 'areaId' })
  area: Area;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  rol: UserRole;

  @Column('bool', { default: true })
  IsActive: boolean;

  @Column('bool', { default: false })
  IsAuthorized: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
