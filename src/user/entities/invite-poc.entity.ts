import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../auth/roles.enum';

@Entity({ name: 'InvitePoc' })
export class InvitePoc {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar', length: 255 }) name: string;
  @Column({ type: 'varchar', length: 255, unique: true }) email: string;
  @Column({ type: 'varchar', length: 255, default: Role.Poc }) role: string;
  @Column({ type: 'date', nullable: true }) closed: Date;
}
