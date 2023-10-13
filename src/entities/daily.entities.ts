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
export class Daily extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  daily_id: string;

  @Column({
    name: 'daily_name',
    default: 0,
  })
  salary_name: number;

  @Column({
    name: 'daily_name',
    default: 0,
  })
  daily_name: number;

  @Column({
    name: 'comment',
    default: 0,
  })
  comment: string;

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

  @ManyToOne(() => Workers, (workers) => workers.daily)
  workers: Workers;
}
