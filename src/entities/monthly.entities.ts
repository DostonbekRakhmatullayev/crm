import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Workers } from './workers.entities';

@Entity({
  name: 'monthly',
})
export class Monthly {
  @PrimaryGeneratedColumn('uuid')
  provinces_id: string;

  @Column({
    name: 'monthly_name',
  })
  monthly_name: number;

  @Column({
    name: 'isActive',
    default: 'isActive',
  })
  isActive: string;

  @Column({
    name: 'penalty',
    default: 0,
  })
  penalty: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Workers, (workers) => workers.monthly)
  workers: Workers;
}
