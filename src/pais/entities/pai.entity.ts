import { User } from 'src/auth/entities/auth.entity';
import { Sucursale } from 'src/sucursales/entities/sucursale.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pais')
export class Pai {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  nombre_pais: string;

  @Column({ type: 'varchar', length: 25 })
  code: string;

  @OneToMany(() => Sucursale, (sucursal) => sucursal.pais)
  sucursales: Sucursale[];

  @OneToMany(() => User, (usuario) => usuario.pais)
  usuarios: User[];

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
