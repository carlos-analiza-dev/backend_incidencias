import { User } from 'src/auth/entities/auth.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ManyToOne(() => Pai, (pais) => pais.id, { eager: true })
  @JoinColumn({ name: 'paisId' })
  pais: Pai;

  @OneToMany(() => User, (usuario) => usuario.area)
  usuario: User[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'gerenteId' })
  gerente: User;
}
