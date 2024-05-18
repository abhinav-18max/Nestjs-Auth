import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../auth/roles.enum';

@Entity({ name: 'InviteVol' })
export class InviteVol {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar', length: 255 }) name: string;
  @Column({ type: 'varchar', length: 255, unique: true }) email: string;
  @Column({ type: 'varchar', length: 255, default: Role.Vol }) role: string;
  @Column({ type: 'int' }) Poc: number;
  @Column({ type: 'date', nullable: true }) closed: Date;
}
