import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Workers } from './workers.entities';

@Entity({
  name: 'monthly',
})
export class Monthly extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  monthly_id: string;

  @Column({
    name: 'monthly_name',
  })
  monthly_name: number;

  @Column({
    name: 'isActive',
    default: 'isActive',
  })
  isActive: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => Workers, (workers) => workers.monthly)
  @JoinColumn()
  workers: Workers;
}
