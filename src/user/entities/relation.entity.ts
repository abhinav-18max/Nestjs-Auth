import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';


@Entity({ name: 'relation' })
export class Relation {
  @PrimaryGeneratedColumn() id: number;
  @OneToOne(() => User)
  @JoinColumn()
  poc: User;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @OneToMany(() => User, (user) => user.relation)
  vol: User[];
}
