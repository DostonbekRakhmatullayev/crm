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
  name: 'daily',
})
export class Daily extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  daily_id: string;

  @Column({
    name: 'daily',
    default: 0,
  })
  daily: number;

  @Column({
    name: 'isActive',
    default: false,
  })
  isActive: boolean;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  // @Column({
  //   type: 'date',
  //   default: () => 'CURRENT_DATE',
  // })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Workers, (workers) => workers.daily)
  workers: Workers;
}
