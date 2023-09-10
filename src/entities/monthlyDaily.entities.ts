import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';
import { Workers } from './workers.entities';

@Entity({
  name: 'monthlydaily',
})
export class MonthlyDaily extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  monthlydaily_id: string;

  @Column({
    name: 'monthly_name',
    default: 0,
  })
  monthly_name: number;

  @Column({
    name: 'monthlydaily_name',
    default: 0,
  })
  monthlydaily_name: number;

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

  @ManyToOne(() => Workers, (workers) => workers.monthlyDaily)
  workers: Workers;
}
